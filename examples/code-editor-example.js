import React from 'react';
import ReactDOM from 'react-dom';
import { CodeEditor } from 'flocs-visual-components';

function handleChange(newCode) {
  console.log('new code:', newCode);
}

const component = (
  <CodeEditor
    code="print('Los Karlos was here!')"
    onChange={handleChange}
  />
);

const mountElement = document.getElementById('codeEditorExample');
ReactDOM.render(component, mountElement);
