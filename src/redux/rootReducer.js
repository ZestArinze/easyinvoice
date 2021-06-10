import { combineReducers } from 'redux';
import homeReducer from './dashboard/reducers/homeReducer';
import authReducer from './user/reducers/authReducer';
import registerReducer from './user/reducers/registerReducer';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  home: homeReducer,
});
