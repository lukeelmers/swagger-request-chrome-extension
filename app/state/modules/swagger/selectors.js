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
  const pathData = get(getSwagger(state), `paths[${path}]`, {});
  const pathOperations = Object.keys(pathData).reduce((obj, p) => {
    if (methods.indexOf(p) > -1) {
      obj[p] = {
        ...pathData[p],
        parameters: [...get(pathData, `[${p}]parameters`, []), ...get(pathData, 'parameters', [])],
      };
    }
    return obj;
  }, {});
  return pathOperations;
};

export const getOperationParams = (state, path, operation) => {
  return groupBy(get(getPathOperations(state, path), `${operation}.parameters`, []), 'in');
};

const resolveRef = (state, ref) => {
  // TODO: Add support for relative refs.
  const path = ref.replace('#/', '').replace('/', '.');
  return get(getSwagger(state), path, null);
};

export const resolveRefs = (state, obj) => {
  // TODO: Add support for nested $refs.
  if (!obj) {
    return {};
  }
  const { $ref, ...keys } = obj;
  const resolved = $ref ? { ...keys, ...resolveRef(state, $ref) } : obj;
  return resolved;
};
