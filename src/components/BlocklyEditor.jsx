import React, { PropTypes } from 'react';
import ReactBlocklyComponent from 'react-blockly-component';
import { blocklyXmlToRoboAst } from '../core/blockly';
import { completeToolbox } from '../core/toolbox';

/*
 * Blockly editor requires global Blockly object
 * It fills the parent div completely and resize on dimensions change
 */
export default class BlocklyEditor extends React.Component {
  componentDidMount() {
    // TODO: if hook methods not needed, rewrite as a functional component
    console.log('blockly editor did mount');
  }

  // getBlocklyWorkspace() {
  //   return this.blocklyEditor.refs.workspace.state.workspace;
  // }

  render() {
    const workspaceConfiguration = {
      trashcan: true,
    };

    /*
    const roboAstToBlocklyXml = roboAst => {
      // TODO: unfake = implement
      const blocklyXml = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="start" deletable="false" x="210" y="10"></block></xml>';
      return blocklyXml;
    };
    const initialXml = roboAstToBlocklyXml(this.props.roboAst);
    */

    const initialXml = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="start" deletable="false" x="210" y="10"></block></xml>';

    const xmlDidChange = newXml => {
      const roboAst = blocklyXmlToRoboAst(newXml);
      console.log('new roboAst:', roboAst);
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
          toolboxBlocks={completeToolbox}
          initialXml={initialXml}
          xmlDidChange={xmlDidChange}
          wrapperDivClassName={'fill-height'}
        />
      </div>
    );
  }
}

BlocklyEditor.propTypes = {
  // blocks: PropTypes.array,
  roboAst: PropTypes.object,
  onChange: PropTypes.func,
};

BlocklyEditor.defaultProps = {
  // blocks: [],
  roboAst: { head: 'start', body: [] },
  onChange: null,
};
