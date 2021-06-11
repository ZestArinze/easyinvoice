import AppHandledException from '../../../models/AppHandledException';
import { apiRequest, checkAuthStatus } from '../../../utils/apiRequest';

export const ADD_INVOICE_FAILURE = 'ADD_INVOICE_FAILURE';
export const ADD_INVOICE_SUCCESS = 'ADD_INVOICE_SUCCESS';
export const INVOICE_RESET = 'INVOICE_RESET';

export const GET_INVOICES_FAILURE = 'GET_INVOICES_FAILURE';
export const GET_INVOICES_SUCCESS = 'GET_INVOICES_SUCCESS';
export const GET_INVOICE_ITEMS_FAILURE = 'GET_INVOICE_ITEMS_FAILURE';
export const GET_INVOICE_ITEMS_SUCCESS = 'GET_INVOICE_ITEMS_SUCCESS';

export const reset = () => {
  return async (dispatch) => {
    dispatch({
      type: INVOICE_RESET,
      data: null,
    });
  };
};

export const addInvoice = (data) => {
  return async (dispatch) => {
    try {
      const response = await apiRequest('/invoices', 'POST', data);
      const responseData = await response.json();
      checkAuthStatus(response, dispatch);

      console.log('-------------> responseData :', responseData);

      if (!response.ok) {
        if (responseData) {
          if (!responseData.status) {
            dispatch({
              type: ADD_INVOICE_FAILURE,
              data: responseData,
            });
            return;
          }
        }
        throw new AppHandledException('Network Error...');
      }

      dispatch({
        type: ADD_INVOICE_SUCCESS,
        data: responseData,
      });
    } catch (error) {
      console.log(error);

      if (
        error.message === 'Network request failed' ||
        error.message === 'Network Error'
      ) {
        throw new AppHandledException(error.message);
      }
      throw error;
    }
  };
};

export const getInvoices = () => {
  return async (dispatch) => {
    try {
      const response = await apiRequest('/invoices', 'GET');
      const responseData = await response.json();

      checkAuthStatus(response, dispatch);

      if (!response.ok) {
        if (responseData) {
          if (!responseData.status) {
            dispatch({
              type: GET_INVOICES_FAILURE,
              data: responseData,
            });
            return;
          }
        }
        throw new AppHandledException('Network Error...');
      }

      dispatch({
        type: GET_INVOICES_SUCCESS,
        data: responseData,
      });
    } catch (error) {
      console.log(error);

      if (
        error.message === 'Network request failed' ||
        error.message === 'Network Error'
      ) {
        throw new AppHandledException(error.message);
      }
      throw error;
    }
  };
};

export const getInvoiceItems = (id) => {
  return async (dispatch) => {
    try {
      const response = await apiRequest(`/invoices/${id}`, 'GET');
      const responseData = await response.json();

      console.log('------> ', responseData);

      checkAuthStatus(response, dispatch);

      if (!response.ok) {
        if (responseData) {
          if (!responseData.status) {
            dispatch({
              type: GET_INVOICE_ITEMS_FAILURE,
              data: responseData,
            });
            return;
          }
        }
        throw new AppHandledException('Network Error...');
      }

      dispatch({
        type: GET_INVOICE_ITEMS_SUCCESS,
        data: responseData,
      });
    } catch (error) {
      console.log(error);

      if (
        error.message === 'Network request failed' ||
        error.message === 'Network Error'
      ) {
        throw new AppHandledException(error.message);
      }
      throw error;
    }
  };
};
