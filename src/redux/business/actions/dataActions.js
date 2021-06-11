import AppHandledException from '../../../models/AppHandledException';
import { apiRequest, checkAuthStatus } from '../../../utils/apiRequest';

export const DATA_RESET = 'DATA_RESET';
export const GET_CURRENCIES_FAILURE = 'GET_CURRENCIES_FAILURE';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';

export const reset = () => {
  return async (dispatch) => {
    dispatch({
      type: DATA_RESET,
      data: null,
    });
  };
};

export const getCurrencies = () => {
  return async (dispatch) => {
    try {
      const response = await apiRequest('/currencies', 'GET');
      const responseData = await response.json();

      checkAuthStatus(response, dispatch);

      if (!response.ok) {
        if (responseData) {
          if (!responseData.status) {
            dispatch({
              type: GET_CURRENCIES_FAILURE,
              data: responseData,
            });
            return;
          }
        }
        throw new AppHandledException('Network Error...');
      }

      dispatch({
        type: GET_CURRENCIES_SUCCESS,
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
