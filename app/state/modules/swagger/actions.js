import * as types from './types';

export const changeSwagger = data => ({
  type: types.ON_SWAGGER_CHANGE,
  data,
});
