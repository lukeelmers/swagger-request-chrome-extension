import * as types from './types';

const initialState = {
  loading: false,
  error: null,
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
        error: null,
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
        // data: action.data, // TODO: Do something with error data.
      };
    default:
      return state;
  }
}
