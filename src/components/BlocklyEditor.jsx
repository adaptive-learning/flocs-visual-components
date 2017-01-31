import React, { PropTypes } from 'react';
import ReactBlocklyComponent from 'react-blockly-component';
import { blocklyXmlToRoboAst } from '../core/blockly';
import { generateBlocklyXml } from '../core/blocklyXmlGenerator';
import { completeToolbox } from '../core/toolbox';


const workspaceConfiguration = {
  trashcan: true,
};


// Blockly editor requires global Blockly object
// It fills the parent div completely and resize on dimensions change
export default class BlocklyEditor extends React.Component {

  // Sometimes, we need to set a new program, e.g. when a new task is set.
  // However, ReactBlocklyComponent only sets an initial XML.
  // So we need to be able set a new XML manually, but we can't do that
  // every time - we would destroy Blockly internal ID's and we could also
  // easily end up in an infinite update-dispatch loop.
  // Hence, we will use an explicit flag (editorSessionId) to distinguish
  // between an internal change (within Blockly) and an external change (in our
  // reducers).
  componentDidUpdate(prevProps) {
    if (prevProps.editorSessionId !== this.props.editorSessionId) {
      this.setRoboAst(this.props.roboAst);
    }
  }

  setRoboAst(roboAst) {
    const newXml = generateBlocklyXml(roboAst);
    this.setXml(newXml);
  }

  setXml(xml) {
    this.blocklyWorkspace.clear();
    this.blocklyEditor.importFromXml(xml);
  }

  // Return Blockly.Workspace
  // (node_modules/node-blockly/blockly/core/workspace.js)
  get blocklyWorkspace() {
    return this.workspaceComponent.state.workspace;
  }

  // Return ReactBlocklyComponent.BlocklyWorkspace
  // (node_modules/react-blockly-component/src/BlocklyWorkspace.jsx)
  get workspaceComponent() {
    return this.blocklyEditor.refs.workspace;
  }

  render() {
    const initialXml = generateBlocklyXml(this.props.roboAst);
    const xmlDidChange = newXml => {
      const roboAst = blocklyXmlToRoboAst(newXml);
      this.props.onChange(roboAst);
    };
    return (
      <div
        style={{
          display: 'inline-block',
          position: 'absolute',
          top: '0px',
          bottom: '0px',
          left: '0px',
          right: '0px',
          color: 'green',
        }}
      >
        <ReactBlocklyComponent.BlocklyEditor
          ref={(ref) => { this.blocklyEditor = ref; }}
          workspaceConfiguration={workspaceConfiguration}
          toolboxBlocks={this.props.toolboxBlocks}
          initialXml={initialXml}
          xmlDidChange={xmlDidChange}
          wrapperDivClassName={'fill-height'}
        />
      </div>
    );
  }
}

BlocklyEditor.propTypes = {
  toolboxBlocks: PropTypes.array,
  roboAst: PropTypes.object,
  onChange: PropTypes.func,
  editorSessionId: PropTypes.number,
};

BlocklyEditor.defaultProps = {
  toolboxBlocks: completeToolbox,
  roboAst: { head: 'start', body: [] },
  onChange: null,
  editorSessionId: 0,
};
