import React from 'react';
import PropTypes from 'prop-types';

import style from './Path.css';

const propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.array,
};

const defaultProps = {
  children: [],
};

function Path({ name, children }) {
  return (
    <li key={name} className={style.Path}>
      {name}
      {children}
    </li>
  );
}

Path.propTypes = propTypes;
Path.defaultProps = defaultProps;

export default Path;
