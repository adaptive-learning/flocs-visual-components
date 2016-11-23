import React from 'react';

export default function GameStatus({ solved, dead }) {

  return (
    <div>
      {solved && <span>solved</span>}
      {dead && <span>dead</span>}
    </div>
  );
}
