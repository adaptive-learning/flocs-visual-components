import React from 'react';
import ReactDOM from 'react-dom';
import { BlocklyEditor } from 'flocs-visual-components';

const mountElement = document.getElementById('blocklyEditorExample');
if (mountElement !== null) {
  const handleChange = newCode => {
    console.log('new code:', newCode);
  };
  const component = (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} >
      <div style={{ backgroundColor: 'blue', height: '50px', width: '100%' }} />
      <span
        style={{
          display: 'inline-block',
          position: 'absolute',
          backgroundColor: 'red',
          top: '50px',
          bottom: '0px',
          left: '0px',
          right: '300px',
        }}
      >
        <BlocklyEditor
          onChange={handleChange}
        />
      </span>
      <span
        style={{
          display: 'inline-block',
          position: 'absolute',
          right: 0,
          width: '300px',
          top: '50px',
          bottom: 0,
          backgroundColor: 'yellow',
        }}
      />
    </div>
  );
  ReactDOM.render(component, mountElement);
}
