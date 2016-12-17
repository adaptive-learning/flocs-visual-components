import React, { PropTypes } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/python';
import 'brace/theme/solarized_light';

export default function CodeEditor({ code, onChange }) {
  return (
    <AceEditor
      value={code}
      onChange={onChange}
      mode="python"
      theme="solarized_light"
      fontSize={16}
      editorProps={{ $blockScrolling: true }}
      style={{ display: 'inline-block' }}
    />
  );
}

CodeEditor.propTypes = {
  code: PropTypes.string,
  onChange: PropTypes.func,
};

CodeEditor.defaultProps = {
  code: '',
  onChange: null,
};
