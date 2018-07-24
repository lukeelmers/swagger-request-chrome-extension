const mocks = {
  'todos.stoplight.io/todos': {
    // eslint-disable-next-line
    get: [{"id":61922,"name":"string","completed":null,"completed_at":null,"url":"http://todos.stoplight.io/todos/61922"},{"id":61911,"name":"string","completed":true,"completed_at":null,"url":"http://todos.stoplight.io/todos/61911"},{"id":61885,"name":"string","completed":null,"completed_at":null,"url":"http://todos.stoplight.io/todos/61885"},{"id":61881,"name":"takeoutcgarbage","completed":true,"completed_at":null,"url":"http://todos.stoplight.io/todos/61881"},{"id":61847,"name":"string","completed":null,"completed_at":null,"url":"http://todos.stoplight.io/todos/61847"},{"id":61846,"name":"string","completed":null,"completed_at":null,"url":"http://todos.stoplight.io/todos/61846"},{"id":61845,"name":"string","completed":null,"completed_at":null,"url":"http://todos.stoplight.io/todos/61845"},{"id":61786,"name":"string","completed":true,"completed_at":null,"url":"http://todos.stoplight.io/todos/61786"},{"id":61784,"name":"string","completed":null,"completed_at":null,"url":"http://todos.stoplight.io/todos/61784"},{"id":61782,"name":"string","completed":null,"completed_at":null,"url":"http://todos.stoplight.io/todos/61782"}],
    // eslint-disable-next-line
    post: {"id":61946,"name":"test","completed":false,"completed_at":null,"created_at":"2018-07-24T03:40:56.510Z","updated_at":"2018-07-24T03:40:56.510Z"},
  },
  'todos.stoplight.io/todos/61922': {
    // eslint-disable-next-line
    get: {"id":61922,"name":"string","completed":null,"completed_at":null,"url":"http://todos.stoplight.io/todos/61922"},
    // eslint-disable-next-line
    put: {"id":61922,"name":"string","completed":null,"completed_at":null,"url":"http://todos.stoplight.io/todos/61922"},
  },
};

class MockResponse {
  constructor() {
    this._res = null;
  }

  fetch(method, url) {
    this._res = mocks[url][method] || null;
    return this;
  }

  json() {
    const res = this._res;
    this._res = null;
    return res ? Promise.resolve(res) : Promise.reject();
  }
}

export default new MockResponse();
