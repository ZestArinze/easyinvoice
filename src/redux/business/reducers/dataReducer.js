import {
  GET_CURRENCIES_FAILURE,
  GET_CURRENCIES_SUCCESS,
} from '../actions/dataActions';

const initialState = {
  currencies: { status: false, message: null, data: [], error: null },
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENCIES_SUCCESS:
      return {
        ...state,
        currencies: action.data,
      };
    case GET_CURRENCIES_FAILURE:
      return {
        ...state,
        currencies: { ...action.data, data: [] },
      };
    default:
      return state;
  }
}
