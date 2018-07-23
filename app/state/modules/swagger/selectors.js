import get from 'lodash/get';
import pick from 'lodash/pick';
import groupBy from 'lodash/groupBy';

const methods = ['get', 'head', 'post', 'put', 'patch', 'delete', 'options', 'trace'];

export const getSwagger = state => state.swagger;
export const getHost = state => getSwagger(state).host;
export const getPaths = state => {
  return get(getSwagger(state), 'paths', {});
};
export const getPathOperations = (state, path) => {
  return pick(get(getSwagger(state), `paths[${path}]`, {}), methods);
};
export const getOperationParams = (state, path, operation) => {
  return groupBy(get(getPathOperations(state, path), `${operation}.parameters`, []), 'in');
};
