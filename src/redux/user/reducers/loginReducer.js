import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  RESET,
} from '../actions/authActions';

const initialState = {
  status: false,
  message: null,
  data: null,
  error: null,
};

export default function loginReducer(state = initialState, action) {
  // console.log('----------------> loginReducer action: ', action);

  switch (action.type) {
    case RESET:
      return state;
    case LOGOUT:
      return state;
    case LOGIN:
      return {
        ...state,
        ...action.data,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.data,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
