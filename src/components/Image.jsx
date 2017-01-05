import React, { PropTypes } from 'react';

export default function Image({ imageId, width, height, position, bottom, left }) {
  const imageStyle = {
    position,
    width: `${width}px`,
    height: `${height}px`,
    bottom: `${bottom}px`,
    left: `${left}px`,
  };
  // eslint-disable-next-line global-require
  const sourcePath = require(`../../assets/images/${imageId}.png`);
  return (
    <img src={sourcePath} alt={imageId} style={imageStyle} />
  );
}

Image.propTypes = {
  imageId: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  position: PropTypes.string,
  bottom: PropTypes.number,
  left: PropTypes.number,
};

Image.defaultProps = {
  position: 'relative',
  bottom: 0,
  left: 0,
};
