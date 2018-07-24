import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  required: PropTypes.bool.isRequired,
  schema: PropTypes.shape({
    example: PropTypes.object,
    properties: PropTypes.object,
  }).isRequired,
};

class Parameter extends React.Component {
  render() {
    const { name, section, type, required, schema } = this.props;
    const { example, properties } = schema;
    const inputType = Array.isArray(type) ? type[0] : type;
    const inputDefault = Array.isArray(type) ? type[1] : undefined;

    let exampleText = example;
    if (!example && properties) {
      const reducedProps = Object.keys(properties).reduce((obj, p) => {
        const pType = Array.isArray(properties[p].type)
          ? properties[p].type[0]
          : properties[p].type;
        const pDefault = Array.isArray(properties[p].type)
          ? properties[p].type[1]
          : properties[p].type;
        obj[p] = pType === 'boolean' && pDefault !== pType ? JSON.parse(pDefault) : pDefault;
        return obj;
      }, {});
      exampleText = reducedProps;
    }

    let content = null;
    switch (inputType) {
      case 'integer':
      case 'number':
        content = (
          <input
            name={name}
            type="number"
            id={`${section}_${name}`}
            defaultValue={inputDefault}
          />
        );
        break;
      case 'boolean':
        content = (
          <input
            name={name}
            type="checkbox"
            id={`${section}_${name}`}
            defaultValue={inputDefault}
          />
        );
        break;
      case 'object':
        content = (
          <textarea
            name={name}
            id={`${section}_${name}`}
            defaultValue={JSON.stringify(exampleText, null, 2)}
          />
        );
        break;
      default:
        content = (
          <input
            name={name}
            type="text"
            id={`${section}_${name}`}
            defaultValue={inputDefault}
          />
        );
    }

    return (
      <div>
        <label htmlFor={`${section}_${name}`}>{name}</label>
        {content}
      </div>
    );
  }
}

Parameter.propTypes = propTypes;

export default Parameter;
