import React, { PropTypes } from 'react';


export default function GameControls({ controls, onClick }) {
  const GROUP = {
    fly: 'commands',
    left: 'commands',
    right: 'commands',
    shoot: 'commands',
    run: 'run',
    reset: 'reset',
  };

  function visible(controlGroup) {
    return controls[controlGroup] === 'active' || controls[controlGroup] === 'passive';
  }

  function disabled(controlGroup) {
    return controls[controlGroup] === 'passive';
  }

  function conditionallyRenderControlButton(name, label) {
    const controlGroup = GROUP[name];
    if (!(visible(controlGroup))) {
      return null;
    }
    return (
      <button disabled={disabled(controlGroup)} onClick={() => onClick(name)}>
        {label}
      </button>
    );
  }

  return (
    <span style={{ display: 'block', margin: '5px 0px' }}>
      {visible('commands') &&
        <span style={{ display: 'block', marginBottom: '2px' }}>
          {conditionallyRenderControlButton('fly', 'Fly')}
          {conditionallyRenderControlButton('left', 'Left')}
          {conditionallyRenderControlButton('right', 'Right')}
          {conditionallyRenderControlButton('shoot', 'Shoot')}
        </span>
      }
      {conditionallyRenderControlButton('run', 'Run')}
      {conditionallyRenderControlButton('reset', 'Reset')}
    </span>
  );
}

GameControls.propTypes = {
  controls: PropTypes.object,
  onClick: PropTypes.func,
};

GameControls.defaultProps = {
  controls: { commands: 'active', run: 'active', reset: 'hidden' },
  onClick: null,
};
