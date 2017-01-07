import React, { PropTypes } from 'react';
import AceEditor from 'react-ace';

import 'brace/theme/solarized_light';
import '../core/roboCodeHighlighter';


export default class CodeEditor extends React.Component {
  componentDidUpdate() {
    if (this.props.code === '') {
      this.aceEditor.editor.focus();
    }
  }

  render() {
    return (
      <AceEditor
        ref={(ref) => { this.aceEditor = ref; }}
        value={this.props.code}
        onChange={this.props.onChange}
        mode="robocode"
        theme="solarized_light"
        fontSize={16}
        focus={true}
        editorProps={{ $blockScrolling: true }}
        style={{ display: 'inline-block' }}
      />
    );
  }
}

CodeEditor.propTypes = {
  code: PropTypes.string,
  onChange: PropTypes.func,
};

CodeEditor.defaultProps = {
  code: '',
  onChange: null,
};
