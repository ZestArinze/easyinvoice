import {
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  RESET,
} from '../actions/registerActions';

const initialState = {
  items: [],
  totalAmount: 0,
  itemsCount: 0,
  status: false,
  message: null,
  error: {},
};

export default function registerReducer(state = initialState, action) {
  // console.log('---------------->', action);

  switch (action.type) {
    case RESET:
      return state;
    case REGISTER:
      return {
        ...state,
        ...action.data,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.data,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
