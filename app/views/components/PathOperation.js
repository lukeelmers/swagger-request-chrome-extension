import React from 'react';
import PropTypes from 'prop-types';

import Parameter from './Parameter';

const propTypes = {
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired, // TODO: define shape
  onSend: PropTypes.func.isRequired,
  resolveRefs: PropTypes.func.isRequired,
};

class PathOperation extends React.Component {
  state = {};

  handleChange = (section, e) => {
    if (section === 'body') {
      return this.setState({ body: e.target.value });
    }
    return this.setState({
      [section]: {
        ...this.state[section],
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      },
    });
  };

  handleSend = e => {
    const { header, query, path, body } = this.state;
    e.preventDefault();
    const detokenize = (original, tokens = {}) => {
      Object.keys(tokens).forEach(t => {
        original = original.replace(`{${t}}`, tokens[t])
      });
      return original;
    };
    this.props.onSend(this.props.method, detokenize(this.props.path, path), {
      header,
      query,
      body,
    });
  };

  render() {
    const {
      id,
      loading,
      path,
      method,
      summary,
      params,
      resolveRefs,
    } = this.props;
    return (
      <div>
        {method} {path} {loading && 'loading'}
        <button onClick={this.handleSend} disabled={loading}>send</button>
        <br />
        &gt; Parameters<br />
        {Object.keys(params).map((param, i) => {
          const section = resolveRefs(params[param][0]).in || null;
          if (!section) {
            return;
          }
          return (
            // eslint-disable-next-line
            <form key={i} onChange={e => this.handleChange(section, e)}>
              <h6>{section}</h6>
              {params[param].map(p => {
                p = resolveRefs(p);
                const schema = resolveRefs(p.schema);
                return (
                  <Parameter
                    key={`${section}_${p.name}`}
                    name={p.name}
                    section={section}
                    type={p.type || schema.type}
                    required={!!p.required}
                    schema={schema}
                  />
                );
              })}
            </form>
          );
        })}
        <br />
      </div>
    );
  }
}

PathOperation.propTypes = propTypes;

export default PathOperation;
