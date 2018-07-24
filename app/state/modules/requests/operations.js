import * as actions from './actions';
import * as selectors from './selectors';
import MockResponse from '../../utils/MockResponse';

// Forwarded action creators
// ...

// Thunks, Sagas, etc.
export function sendRequest(method, url, data) {
  return (dispatch, getState) => {
    const state = getState();
    if (selectors.getIsLoading(state)) {
      return Promise.resolve();
    }
    dispatch(actions.sendRequest(method, url, data));
    return fetch(`http://${url}?apikey=123${data.query}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...data.header,
      },
      method,
      mode: 'no-cors', // server doesn't have CORS headers set
      referrer: 'no-referrer',
      body: data.body,
    })
      .then(res => MockResponse.fetch(method, url).json())
      .then(json => dispatch(actions.receiveResponse(json)))
      .catch(err => dispatch(actions.receiveError(err)));
  };
}
