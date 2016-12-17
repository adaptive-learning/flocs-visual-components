import React, { PropTypes } from 'react';

export default function GameStatus({ solved, dead }) {
  return (
    <span style={{ display: 'block' }}>
      {solved && <span>solved</span>}
      {dead && <span>dead</span>}
    </span>
  );
}

GameStatus.propTypes = {
  solved: PropTypes.bool,
  dead: PropTypes.bool,
};

GameStatus.defaultProps = {
  solved: false,
  dead: false,
};
