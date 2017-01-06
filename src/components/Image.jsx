import React, { PropTypes } from 'react';

export default function Image({ imageId, style }) {
  // eslint-disable-next-line global-require
  const sourcePath = require(`../../assets/images/${imageId}.png`);
  return (
    <img src={sourcePath} alt={imageId} style={style} />
  );
}

Image.propTypes = {
  imageId: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Image.defaultProps = {
  style: {},
};
