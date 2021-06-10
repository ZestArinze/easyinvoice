import {
  HOME,
  HOME_FAILURE,
  HOME_SUCCESS,
  RESET,
} from '../../dashboard/actions/homeActions';

const initialState = {
  status: false,
  message: null,
  data: null,
  error: null,
};

export default function homeReducer(state = initialState, action) {
  // console.log('----------------> homeReducer action: ', action);

  switch (action.type) {
    case RESET:
      return state;
    case HOME:
      return {
        ...state,
        ...action.data,
      };
    case HOME_SUCCESS:
      return {
        ...state,
        ...action.data,
      };
    case HOME_FAILURE:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
