import React, { PropTypes } from 'react';
import GameObject from './GameObject';
import FieldBackground from './FieldBackground';
import spaceBackroundPath from '../../assets/images/space.png';

export default function SpaceWorld({ fields }) {
  const width = 250;
  const { cols, backgrounds, objects } = prepareFields(fields);
  const fieldSize = Math.floor(width / cols);
  // const height = fieldSize * rows;
  const worldStyle = {
    display: 'block',
    position: 'relative',
  };
  const backgroundGridStyle = {
    display: 'block',
    backgroundImage: `url(${spaceBackroundPath})`,
  };

  return (
    <span style={worldStyle}>
      <span style={backgroundGridStyle} >
        {backgrounds.map((backgroundsRow, index) =>
          <span style={{ display: 'table-row' }} key={index}>
            {backgroundsRow.map((background, bgIndex) =>
              <FieldBackground key={bgIndex} color={background} size={fieldSize} />
            )}
          </span>
        )}
      </span>
      <span>
        {objects.map((object, index) =>
          <GameObject
            key={index}
            imageId={object.imageId}
            width={fieldSize}
            height={fieldSize}
            position="absolute"
            bottom={object.row * fieldSize}
            left={object.col * fieldSize}
          />
        )}
      </span>
    </span>
  );
}

SpaceWorld.propTypes = {
  fields: PropTypes.array.isRequired,
};


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


const emptyWorld = {
  rows: 1,
  cols: 1,
  backgrounds: [['k']],
  objects: [],
};


function prepareFields(fields) {
  if (fields == null || fields.length === 0) {
    return emptyWorld;
  }
  const rows = fields.length;
  const cols = fields[0].length;
  const backgrounds = fields.map(row => row.map(field => field[0]));
  const objects = [];
  fields.forEach((row, i) => row.forEach((field, j) => field[1].forEach(object => {
    objects.push({ imageId: IMAGE_TYPES[object], row: rows - i - 1, col: j });
  })));
  return { rows, cols, backgrounds, objects };
}
