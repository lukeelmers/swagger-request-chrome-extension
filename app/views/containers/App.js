import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { swaggerSelectors, swaggerOperations } from '../../state/modules/swagger';
import { requestsOperations } from '../../state/modules/requests';

import Path from '../components/Path';
import PathOperation from '../components/PathOperation';
import style from './App.css';

const propTypes = {
  host: PropTypes.string.isRequired,
  paths: PropTypes.object.isRequired,
  getPathOperations: PropTypes.func.isRequired,
  getOperationParams: PropTypes.func.isRequired,
  sendRequest: PropTypes.func.isRequired,
};

class App extends React.Component {
  render() {
    const {
      host,
      paths,
      getPathOperations,
      getOperationParams,
      sendRequest,
    } = this.props;

    return (
      <div className={style.App}>
        <h1>Request Maker</h1>
        <h3>{host}</h3>
        <ul>
          {Object.keys(paths).map(p => (
            <Path name={p} key={p} params={paths[p].parameters || []}>
              {Object.keys(getPathOperations(p)).map(o => (
                <PathOperation
                  key={paths[p][o].operationId}
                  id={paths[p][o].operationId}
                  path={p}
                  method={o}
                  summary={paths[p][o].summary}
                  params={getOperationParams(p, o)}
                  onSend={sendRequest}
                />
              ))}
            </Path>
          ))}
        </ul>
      </div>
    );
  }
}

App.propTypes = propTypes;

const mapStateToProps = state => ({
  host: swaggerSelectors.getHost(state),
  paths: swaggerSelectors.getPaths(state),
  getPathOperations: path => swaggerSelectors.getPathOperations(state, path),
  getOperationParams: (path, operation) => {
    return swaggerSelectors.getOperationParams(state, path, operation);
  },
});

const mapDispatchToProps = dispatch => ({
  sendRequest: data => dispatch(requestsOperations.sendRequest(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
