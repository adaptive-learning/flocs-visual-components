import React from 'react';

export default function GameStatus({ solved, dead }) {

  return (
    <span style={{display: 'block'}}>
      {solved && <span>solved</span>}
      {dead && <span>dead</span>}
    </span>
  );
}
