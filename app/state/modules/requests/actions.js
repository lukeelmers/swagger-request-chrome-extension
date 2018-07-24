import * as types from './types';

export const sendRequest = (method, url, data) => ({
  type: types.SEND_REQUEST,
  method,
  url,
  data,
});

export const receiveResponse = data => ({
  type: types.RECEIVE_RESPONSE,
  data,
});

export const receiveError = data => ({
  type: types.RECEIVE_ERROR,
  data,
});
