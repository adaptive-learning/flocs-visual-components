import React, { PropTypes } from 'react';
import WorldBlock from './WorldBlock';

export default function SpaceWorld({ fields }) {
  return (
    <span style={{ display: 'block' }}>
      {fields.map((fieldRow, index) =>
        <span style={{ display: 'table-row' }} key={index}>
          {fieldRow.map((field, i) =>
            <WorldBlock key={i} background={field[0]} objects={field[1]} />
          )}
        </span>
      )}
    </span>
  );
}

SpaceWorld.propTypes = {
  fields: PropTypes.array.isRequired,
};
