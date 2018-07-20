import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';

export default class Root extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
