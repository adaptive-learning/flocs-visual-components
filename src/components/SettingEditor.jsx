import React, { PropTypes } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/text';
import 'brace/theme/solarized_light';

export default function SettingEditor({ setting, isValid, onChange }) {
  const annotations = [];
  if (!isValid) {
    annotations.push({ row: 0, column: 0, type: 'error', text: 'Invalid setting' });
  }

  return (
    <AceEditor
      value={setting}
      onChange={onChange}
      mode="text"
      theme="solarized_light"
      fontSize={16}
      annotations={annotations}
      editorProps={{ $blockScrolling: true }}
      style={{ display: 'inline-block' }}
    />
  );
}

SettingEditor.propTypes = {
  setting: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};
