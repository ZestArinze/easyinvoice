import {
  ADD_BUSINESS_FAILURE,
  ADD_BUSINESS_SUCCESS,
  BUSINESS_RESET,
  GET_BUSINESSESS_SUCCESS,
  GET_BUSINESSES_FAILURE,
} from '../actions/businessActions';

const initialState = {
  addBusiness: { status: false, message: null, data: null, error: null },
  businesses: { status: false, message: null, data: [], error: null },
};

export default function businessReducer(state = initialState, action) {
  switch (action.type) {
    case BUSINESS_RESET:
      return initialState;
    case ADD_BUSINESS_SUCCESS:
    case ADD_BUSINESS_FAILURE:
      return {
        ...state,
        addBusiness: action.data,
      };
    case GET_BUSINESSESS_SUCCESS:
      return {
        ...state,
        businesses: action.data,
      };
    case GET_BUSINESSES_FAILURE:
      return {
        ...state,
        businesses: { ...action.data, data: [] },
      };
    default:
      return state;
  }
}
