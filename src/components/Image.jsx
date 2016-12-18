import React, { PropTypes } from 'react';

export default function Image({ imageId, width, height, position }) {
  const imageStyle = {
    width: `${width}px`,
    height: `${height}px`,
    position,
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
};

Image.defaultProps = {
  position: 'relative',
};
