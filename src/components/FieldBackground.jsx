import React, { PropTypes } from 'react';

export default function FieldBackground({ color, size }) {
  const BACKGROUND_COLOR_CLASSES = {
    k: '#222',
    b: '#00f',
    g: '#ddd',
    y: '#fe0',
  };
  const borderWidth = 1;
  const fieldStyle = {
    display: 'table-cell',
    position: 'relative',
    borderStyle: 'solid',
    borderColor: '#444',
    borderWidth: `${borderWidth}px`,
    boxSizing: 'border-box',
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: BACKGROUND_COLOR_CLASSES[color],
    opacity: 0.6,
  };
  return (
    <span style={fieldStyle} />
  );
}

FieldBackground.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
