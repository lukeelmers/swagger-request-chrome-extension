import { combineReducers } from 'redux';
import swagger from './modules/swagger';
import requests from './modules/requests';

const reducers = combineReducers({ swagger, requests });

export default reducers;
