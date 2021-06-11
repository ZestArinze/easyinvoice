import {
  ADD_CLIENT_FAILURE,
  ADD_CLIENT_SUCCESS,
  CLIENT_RESET,
  GET_CLIENTESS_SUCCESS,
  GET_CLIENTES_FAILURE,
} from '../actions/clientActions';

const initialState = {
  addClient: { status: false, message: null, data: null, error: null },
  clients: { status: false, message: null, data: [], error: null },
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_RESET:
      return initialState;
    case ADD_CLIENT_SUCCESS:
    case ADD_CLIENT_FAILURE:
      return {
        ...state,
        addClient: action.data,
      };
    case GET_CLIENTESS_SUCCESS:
      return {
        ...state,
        clients: action.data,
      };
    case GET_CLIENTES_FAILURE:
      return {
        ...state,
        clients: { ...action.data, data: [] },
      };
    default:
      return state;
  }
}
