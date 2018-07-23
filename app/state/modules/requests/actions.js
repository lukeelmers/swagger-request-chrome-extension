import * as types from './types';

export const sendRequest = (data) => ({
  type: types.SEND_REQUEST,
  data,
});

export const receiveResponse = (data) => ({
  type: types.RECEIVE_RESPONSE,
  data,
});
