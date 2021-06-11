import { combineReducers } from 'redux';
import businessReducer from './business/reducers/businessReducer';
import clientReducer from './business/reducers/clientReducer';
import dataReducer from './business/reducers/dataReducer';
import invoiceReducer from './business/reducers/invoiceReducer';
import homeReducer from './dashboard/reducers/homeReducer';
import authReducer from './user/reducers/authReducer';
import registerReducer from './user/reducers/registerReducer';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  home: homeReducer,
  business: businessReducer,
  client: clientReducer,
  invoice: invoiceReducer,
  data: dataReducer,
});
