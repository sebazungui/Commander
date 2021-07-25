import { combineReducers } from 'redux';

import torneos from './torneos';
import auth from './auth';

export const reducers = combineReducers({ torneos, auth });