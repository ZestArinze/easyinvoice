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

export default function authReducer(state = initialState, action) {
  // console.log('----------------> authReducer action: ', action);

  switch (action.type) {
    case RESET:
      return initialState;
    case LOGOUT:
      return initialState;
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
