import React, { PropTypes } from 'react';
import TaskName from './TaskName';

export default function GameStatus({ taskId, solved, dead, diamonds, energy }) {
  return (
    <span style={{ display: 'block' }}>
      <TaskName taskId={taskId} />
      &nbsp;&nbsp; {solved && <span>&#10003;</span>} {dead && <span>&#10005;</span>}
      <span style={{ display: 'block' }}>
        {diamonds.total > 0 && <span>D: {diamonds.taken}/{diamonds.total}&nbsp;&nbsp;</span>}
        {energy.full !== null && <span>E: {energy.current}/{energy.full}</span>}
      </span>
    </span>
  );
}

GameStatus.propTypes = {
  taskId: PropTypes.string.isRequired,
  diamonds: PropTypes.object.isRequired,
  energy: PropTypes.object.isRequired,
  solved: PropTypes.bool,
  dead: PropTypes.bool,
};

GameStatus.defaultProps = {
  solved: false,
  dead: false,
};
