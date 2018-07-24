import reducer from '../reducers';
import * as types from '../types';

const initialState = {
  loading: false,
  error: false,
  requests: [],
};

describe('requests reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
