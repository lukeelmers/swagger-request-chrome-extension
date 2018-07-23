import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  example: PropTypes.object,
};

const defaultProps = {
  example: {},
};

function Parameter({
  name,
  type,
  required,
  example
}) {
  return (
    <div>
      <label htmlFor={`${type}_${name}`}>{name}</label>
      {/* TODO: Pull fields from $ref instead of example. */}
      {Object.keys(example).length ? (
        <textarea id={`${type}_${name}`} defaultValue={JSON.stringify(example, null, 2)} />
      ) : (
        <div id={`${type}_${name}`}>TODO</div>
      )}
    </div>
  );
}

Parameter.propTypes = propTypes;
Parameter.defaultProps = defaultProps;

export default Parameter;
