import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

// Combine and export all reducers
const rootReducer = combineReducers({
	auth: authReducer,
	error: errorReducer,
});

export default rootReducer;
