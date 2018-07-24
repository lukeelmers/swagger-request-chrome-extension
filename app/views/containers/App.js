import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { swaggerSelectors } from '../../state/modules/swagger';
import { requestsOperations, requestsSelectors } from '../../state/modules/requests';

import Path from '../components/Path';
import PathOperation from '../components/PathOperation';
import style from './App.css';

const propTypes = {
  host: PropTypes.string.isRequired,
  paths: PropTypes.object.isRequired,
  lastResponse: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]).isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  resolveRefs: PropTypes.func.isRequired,
  getPathOperations: PropTypes.func.isRequired,
  getOperationParams: PropTypes.func.isRequired,
  sendRequest: PropTypes.func.isRequired,
};

class App extends React.Component {
  handleSendRequest = (method, path, data) => {
    const { sendRequest, host } = this.props;
    return sendRequest(method, `${host}${path}`, data);
  };

  render() {
    const {
      host,
      paths,
      lastResponse,
      error,
      loading,
      resolveRefs,
      getPathOperations,
      getOperationParams,
    } = this.props;

    return (
      <div className={style.App}>
        <h1>{host}</h1>
        {lastResponse && (!!lastResponse.length || !!Object.keys(lastResponse).length) && (
          <div className={style.Response}>
            <label htmlFor="response">response</label>
            <textarea
              id="response"
              value={`// ${error ? 'ERROR' : 'Response'} from ${host}\n` + JSON.stringify(lastResponse, null, 2)}
              readOnly
            />
          </div>
        )}
        <ul className={style.PathList}>
          {Object.keys(paths).map(p => (
            <Path name={p} key={p} params={paths[p].parameters || []}>
              {Object.keys(getPathOperations(p)).map(o => (
                <PathOperation
                  key={paths[p][o].operationId}
                  id={paths[p][o].operationId}
                  loading={loading}
                  path={p}
                  method={o}
                  summary={paths[p][o].summary}
                  params={getOperationParams(p, o)}
                  onSend={this.handleSendRequest}
                  resolveRefs={resolveRefs}
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
  lastResponse: requestsSelectors.getLastResponse(state),
  loading: requestsSelectors.getIsLoading(state),
  error: requestsSelectors.getIsError(state),
  resolveRefs: obj => swaggerSelectors.resolveRefs(state, obj),
  getPathOperations: path => swaggerSelectors.getPathOperations(state, path),
  getOperationParams: (path, operation) => {
    return swaggerSelectors.getOperationParams(state, path, operation);
  },
});

const mapDispatchToProps = dispatch => ({
  sendRequest: (method, url, data) => dispatch(requestsOperations.sendRequest(method, url, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
