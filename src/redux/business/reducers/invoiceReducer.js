import {
  ADD_INVOICE_FAILURE,
  ADD_INVOICE_SUCCESS,
  INVOICE_RESET,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAILURE,
  GET_INVOICE_ITEMS_SUCCESS,
  GET_INVOICE_ITEMS_FAILURE,
} from '../actions/invoiceActions';

const initialState = {
  addInvoice: { status: false, message: null, data: null, error: null },
  invoices: { status: false, message: null, data: [], error: null },
  invoiceItems: { status: false, message: null, data: [], error: null },
};

export default function invoiceReducer(state = initialState, action) {
  switch (action.type) {
    case INVOICE_RESET:
      return initialState;
    case ADD_INVOICE_SUCCESS:
    case ADD_INVOICE_FAILURE:
      return {
        ...state,
        addInvoice: action.data,
      };
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.data,
      };
    case GET_INVOICES_FAILURE:
      return {
        ...state,
        invoices: { ...action.data, data: [] },
      };
    case GET_INVOICE_ITEMS_SUCCESS:
      return {
        ...state,
        invoiceItems: action.data,
      };
    case GET_INVOICE_ITEMS_FAILURE:
      return {
        ...state,
        invoiceItems: { ...action.data, data: [] },
      };
    default:
      return state;
  }
}
