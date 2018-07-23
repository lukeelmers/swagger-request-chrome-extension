import React from 'react';
import PropTypes from 'prop-types';

import Parameter from './Parameter';

const propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  onSend: PropTypes.func.isRequired,
};

class PathOperation extends React.Component {
  handleSend = e => {
    const { method, path } = this.props;
    e.preventDefault();
    this.props.onSend({
      method,
      path,
    });
  };

  render() {
    const {
      id,
      path,
      method,
      summary,
      params,
    } = this.props;
    return (
      <div>
        {method} {path}
        <button onClick={this.handleSend}>send</button>
        <br />
        &gt; Parameters<br />
        {Object.keys(params).map((param, i) => {
          const type = params[param][0].in || null;
          if (!type) return;
          return (
            <div key={i}>
              <h6>{type}</h6>
              {params[param].map((p, j) => (
                <Parameter
                  key={`${type}_${p.name}`}
                  name={p.name}
                  type={type}
                  required={!!p.required}
                  example={p.schema && p.schema.example ? p.schema.example : undefined}
                />
              ))}
            </div>
          );
        })}
        <br />
      </div>
    );
  }
}

PathOperation.propTypes = propTypes;

export default PathOperation;
