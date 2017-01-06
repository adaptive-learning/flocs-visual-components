import React, { PropTypes } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/text';
import 'brace/theme/solarized_light';
import 'brace/keybinding/vim';


export default function SettingEditor({ setting, isValid, onChange, vimMode, onSwitchMode }) {
  const annotations = [];
  if (!isValid) {
    annotations.push({ row: 0, column: 0, type: 'error', text: 'Invalid setting' });
  }

  return (
    <span style={{ display: 'inline-block' }}>
      <AceEditor
        value={setting}
        onChange={onChange}
        mode="text"
        theme="solarized_light"
        fontSize={16}
        keyboardHandler={vimMode ? 'vim' : null}
        annotations={annotations}
        editorProps={{ $blockScrolling: true }}
        style={{ display: 'block' }}
      />
      <span style={{ display: 'block' }}>
        <div>
          <input
            type="checkbox"
            checked={vimMode}
            onChange={onSwitchMode}
          />
          vim mode
        </div>
        <div>
          <a href="https://github.com/adaptive-learning/flocs-visual-components/blob/master/docs/space-world.md"
             target="_blank" rel='noreferrer noopener'>
            Docs: SpaceWorld desription
          </a>
        </div>
      </span>
    </span>
  );
}

SettingEditor.propTypes = {
  setting: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  vimMode: PropTypes.bool.isRequired,
  onSwitchMode: PropTypes.func.isRequired,
};
