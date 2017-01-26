import React, { PropTypes } from 'react';
import ReactBlocklyComponent from 'react-blockly-component';

/*
 * Blockly editor requires global Blockly object
 * It fills the parent div completely and resize on dimensions change
 */
export default class BlocklyEditor extends React.Component {
  componentDidUpdate() {
    // TODO: if hook methods not needed, rewrite as a functional component
    console.log('blockly editor did mount');
  }

  render() {
    const workspaceConfiguration = {};

    const toolboxBlocks = [
      { type: 'controls-start' },
      { type: 'command-fly' },
    ];

    const initialXml = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';

    const xmlDidChange = newXml => {
      console.log('generated xml:', newXml);
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
          workspaceConfiguration={workspaceConfiguration}
          toolboxBlocks={toolboxBlocks}
          initialXml={initialXml}
          xmlDidChange={xmlDidChange}
          wrapperDivClassName={'fill-height'}
        />
      </div>
    );
  }
}

BlocklyEditor.propTypes = {
  blocks: PropTypes.array,
  program: PropTypes.string,
  onChange: PropTypes.func,
};

BlocklyEditor.defaultProps = {
  blocks: [],
  program: '',
  onChange: null,
};
