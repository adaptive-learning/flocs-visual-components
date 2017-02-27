import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { translate } from '../localization';

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

  function conditionallyRenderControlButton(name, label, emph = null, minWidth = 50) {
    const controlGroup = GROUP[name];
    if (!(visible(controlGroup))) {
      return null;
    }
    return (
      <RaisedButton
        label={label}
        disabled={disabled(controlGroup)}
        primary={emph === 'primary'}
        secondary={emph === 'accent'}
        style={{ margin: 2, minWidth }}
        onClick={() => onClick(name)}
      />
    );
  }

  return (
    <span style={{ display: 'block', margin: '5px 4px' }}>
      {visible('commands') &&
        <span style={{ display: 'block', marginBottom: '2px' }}>
          {conditionallyRenderControlButton('fly', '↑')}
          {conditionallyRenderControlButton('left', '↖')}
          {conditionallyRenderControlButton('right', '↗')}
          {conditionallyRenderControlButton('shoot', '★')}
        </span>
      }
      {conditionallyRenderControlButton('run', translate('Run'), 'primary', 88)}
      {conditionallyRenderControlButton('reset', 'Reset', 'accent', false, 88)}
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
