import React, { PropTypes } from 'react';
import Image from './Image';

export default function GameObject({ type, size }) {
  const IMAGE_TYPES = {
    S: 'spaceship',
    A: 'asteroid',
    M: 'meteoroid',
    D: 'diamond',
    explosion: 'explosion',
    laser: 'laser',
    'laser-start': 'laser-start',
    'laser-end': 'laser-end',
    'spaceship-broken': 'spaceship-broken',
    'spaceship-out-left': 'spaceship-out-left',
    'spaceship-out-right': 'spaceship-out-right',
  };


  return (
    <Image imageId={IMAGE_TYPES[type]} width={size} height={size} position="absolute" />
  );
}

GameObject.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

GameObject.defaultProps = {
  size: 50,
};
