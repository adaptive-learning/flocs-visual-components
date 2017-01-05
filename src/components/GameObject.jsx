import React, { PropTypes } from 'react';
import Image from './Image';

export default function GameObject({ imageId, width, height, position, bottom, left }) {
  return (
    <Image {...{ imageId, width, height, position, bottom, left }} />
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
