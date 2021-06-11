import AppHandledException from '../../../models/AppHandledException';
import { apiRequest, checkAuthStatus } from '../../../utils/apiRequest';

export const ADD_BUSINESS_FAILURE = 'ADD_BUSINESS_FAILURE';
export const ADD_BUSINESS_SUCCESS = 'ADD_BUSINESS_SUCCESS';
export const BUSINESS_RESET = 'BUSINESS_RESET';

export const GET_BUSINESSES_FAILURE = 'GET_BUSINESSES_FAILURE';
export const GET_BUSINESSESS_SUCCESS = 'GET_BUSINESSESS_SUCCESS';

export const reset = () => {
  return async (dispatch) => {
    dispatch({
      type: BUSINESS_RESET,
      data: null,
    });
  };
};

export const addBusiness = (data) => {
  return async (dispatch) => {
    try {
      const response = await apiRequest('/businesses', 'POST', data);
      const responseData = await response.json();
      checkAuthStatus(response, dispatch);

      console.log('-------------> responseData :', responseData);

      if (!response.ok) {
        if (responseData) {
          if (!responseData.status) {
            dispatch({
              type: ADD_BUSINESS_FAILURE,
              data: responseData,
            });
            return;
          }
        }
        throw new AppHandledException('Network Error...');
      }

      dispatch({
        type: ADD_BUSINESS_SUCCESS,
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

export const getBusinesses = () => {
  return async (dispatch) => {
    try {
      const response = await apiRequest('/businesses', 'GET');
      const responseData = await response.json();

      checkAuthStatus(response, dispatch);

      if (!response.ok) {
        if (responseData) {
          if (!responseData.status) {
            dispatch({
              type: GET_BUSINESSES_FAILURE,
              data: responseData,
            });
            return;
          }
        }
        throw new AppHandledException('Network Error...');
      }

      dispatch({
        type: GET_BUSINESSESS_SUCCESS,
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
