import AppHandledException from '../../../models/AppHandledException';
import { apiRequest, checkAuthStatus } from '../../../utils/apiRequest';

export const ADD_CLIENT_FAILURE = 'ADD_CLIENT_FAILURE';
export const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS';
export const CLIENT_RESET = 'CLIENT_RESET';

export const GET_CLIENTES_FAILURE = 'GET_CLIENTES_FAILURE';
export const GET_CLIENTESS_SUCCESS = 'GET_CLIENTESS_SUCCESS';

export const reset = () => {
  return async (dispatch) => {
    dispatch({
      type: CLIENT_RESET,
      data: null,
    });
  };
};

export const addClient = (data) => {
  return async (dispatch) => {
    try {
      const response = await apiRequest('/clients', 'POST', data);
      const responseData = await response.json();
      checkAuthStatus(response, dispatch);

      console.log('-------------> responseData :', responseData);

      if (!response.ok) {
        if (responseData) {
          if (!responseData.status) {
            dispatch({
              type: ADD_CLIENT_FAILURE,
              data: responseData,
            });
            return;
          }
        }
        throw new AppHandledException('Network Error...');
      }

      dispatch({
        type: ADD_CLIENT_SUCCESS,
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

export const getClientes = () => {
  return async (dispatch) => {
    try {
      const response = await apiRequest('/clients', 'GET');
      const responseData = await response.json();

      checkAuthStatus(response, dispatch);

      if (!response.ok) {
        if (responseData) {
          if (!responseData.status) {
            dispatch({
              type: GET_CLIENTES_FAILURE,
              data: responseData,
            });
            return;
          }
        }
        throw new AppHandledException('Network Error...');
      }

      dispatch({
        type: GET_CLIENTESS_SUCCESS,
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
