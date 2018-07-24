import * as types from './types';

const initialState = {
  loading: false,
  error: false,
  requests: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SEND_REQUEST:
      return {
        ...state,
        loading: true,
        requests: [
          ...state.requests,
          { method: action.method, url: action.url, data: action.data },
        ],
      };
    case types.RECEIVE_RESPONSE:
      return {
        ...state,
        loading: false,
        error: false,
        requests: state.requests.map((r, i) => {
          if (i === state.requests.length - 1) {
            return { ...r, response: action.data };
          }
          return r;
        }),
      };
    case types.RECEIVE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        requests: state.requests.map((r, i) => {
          if (i === state.requests.length - 1) {
            return { ...r, response: action.data };
          }
          return r;
        }),
      };
    default:
      return state;
  }
}
