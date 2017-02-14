import React, { PropTypes } from 'react';
import Image from './Image';

export default function GameObject({ imageId, width, height, position, bottom, left }) {
  const imageStyle = {
    position,
    width,
    height,
    bottom,
    left,
  };
  return (
    <Image imageId={imageId} style={imageStyle} />
  );
}

GameObject.propTypes = {
  imageId: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  position: PropTypes.string,
  bottom: PropTypes.number,
  left: PropTypes.number,
};

GameObject.defaultProps = {
  position: 'relative',
  bottom: 0,
  left: 0,
};
