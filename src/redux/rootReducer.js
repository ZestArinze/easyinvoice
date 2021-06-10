import { combineReducers } from 'redux';
import homeReducer from './dashboard/reducers/homeReducer';
import loginReducer from './user/reducers/loginReducer';
import registerReducer from './user/reducers/registerReducer';

export default combineReducers({
  login: loginReducer,
  register: registerReducer,
  home: homeReducer,
});
