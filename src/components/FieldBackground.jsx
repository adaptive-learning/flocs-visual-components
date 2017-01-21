import React, { PropTypes } from 'react';

export default function FieldBackground({ color, size }) {
  const BACKGROUND_COLOR_CLASSES = {
    k: '#222',
    r: '#f00',
    g: '#0f0',
    b: '#00f',
    c: '#0ee',
    m: '#e0e',
    y: '#ee0',
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
    opacity: 0.7,
  };
  return (
    <span style={fieldStyle} />
  );
}

FieldBackground.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
