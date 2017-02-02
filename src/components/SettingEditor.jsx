import React, { PropTypes } from 'react';
import AceEditor from 'react-ace';

import 'brace/theme/solarized_light';
import 'brace/keybinding/vim';
import '../core/spaceWorldHighlighter';


export default function SettingEditor({
  spaceWorldText,
  isValid,
  onChange,
  taskId,
  onTaskIdChange,
  category,
  onCategoryChange,
  energy,
  onEnergyChange,
  actionsLimit,
  onActionsLimitChange,
  vimMode,
  onSwitchMode,
  onImport,
  onExport,
  blocklyEditorType,
  onEditorTypeChange,
}) {
  const annotations = [];
  if (!isValid) {
    annotations.push({ row: 0, column: 0, type: 'error', text: 'Invalid setting' });
  }

  return (
    <div style={{ overflowX: 'hidden' }}>
      <div style={{ display: 'table' }}>
        <div style={{ display: 'table-row' }}>
          <span style={{ display: 'table-cell' }}>
            taskId:
          </span>
          <input
            style={{ display: 'table-cell' }}
            type="text"
            value={taskId}
            onChange={onTaskIdChange}
          />
        </div>
        <div style={{ display: 'table-row' }}>
          <span style={{ display: 'table-cell' }}>
            category:
          </span>
          <input
            style={{ display: 'table-cell' }}
            type="text"
            value={category}
            onChange={onCategoryChange}
          />
        </div>
        <div style={{ display: 'table-row' }}>
          <span style={{ display: 'table-cell' }}>
            energy:
          </span>
          <input
            style={{ display: 'table-cell' }}
            type="text"
            value={energy || ''}
            onChange={onEnergyChange}
          />
        </div>
        <div style={{ display: 'table-row' }}>
          <span style={{ display: 'table-cell' }}>
            actionsLimit:
          </span>
          <input
            style={{ display: 'table-cell' }}
            type="text"
            value={actionsLimit || ''}
            onChange={onActionsLimitChange}
          />
        </div>
      </div>
      <AceEditor
        value={spaceWorldText}
        onChange={onChange}
        mode="spaceworld"
        theme="solarized_light"
        fontSize={18}
        keyboardHandler={vimMode ? 'vim' : null}
        annotations={annotations}
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="300px"
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
          <a
            href="https://github.com/adaptive-learning/flocs-visual-components/blob/master/docs/space-world.md"
            target="_blank"
            rel="noreferrer noopener"
          >
            Docs: SpaceWorld desription
          </a>
        </div>
      </span>
      <button onClick={onImport}>
        Import
      </button>
      <button onClick={onExport}>
        Export
      </button>
      <div>
        <input
          type="checkbox"
          checked={blocklyEditorType}
          onChange={onEditorTypeChange}
        />
        Blockly editor
      </div>
    </div>
  );
}

SettingEditor.propTypes = {
  spaceWorldText: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired,
  onTaskIdChange: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  energy: PropTypes.number,
  onEnergyChange: PropTypes.func.isRequired,
  actionsLimit: PropTypes.number,
  onActionsLimitChange: PropTypes.func.isRequired,
  vimMode: PropTypes.bool.isRequired,
  onSwitchMode: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  blocklyEditorType: PropTypes.bool.isRequired,
  onEditorTypeChange: PropTypes.func.isRequired,
};
