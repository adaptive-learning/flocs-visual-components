import React from 'react';

export default function Image({ imageId, width, height, position }) {

  const imageStyle = {
    width: width + 'px',
    height: height + 'px',
    position: position || 'relative',
  };
  //const sourcePath = require(`images/${imageId}.png`);
  const sourcePath = 'TBS:requring-images...';
  return (
    <img src={sourcePath} style={imageStyle} />
  );
}
