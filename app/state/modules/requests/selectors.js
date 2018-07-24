import get from 'lodash/get';

export const getRequests = state => state.requests.requests;

const getRequestsLength = state => state.requests.requests.length;

export const getIsLoading = state => state.requests.loading;

export const getIsError = state => state.requests.error;

export const getLastResponse = state => {
  const len = getRequestsLength(state);
  return get(getRequests(state), `[${len - 1}].response`, []);
};
