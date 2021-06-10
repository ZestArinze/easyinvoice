import AppHandledException from '../../../models/AppHandledException';
import { API_BASE_PATH } from '../../../utils/constants.js';

export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const RESET = 'RESET';

export const reset = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET,
      data: null,
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem('access_token'); // not server logout

    dispatch({
      type: LOGOUT,
      data: null,
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const reqBody = { email, password };
      console.log('********** reqBody:', reqBody);

      const response = await fetch(API_BASE_PATH + '/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      });

      const responseData = await response.json();

      console.log('-----------> responseData: ', responseData);

      if (!response.ok) {
        if (responseData) {
          if (!responseData.status) {
            dispatch({
              type: LOGIN_FAILURE,
              data: responseData,
            });
            return;
          }
        }
        throw new AppHandledException('Network Error...');
      }

      // save auth token
      localStorage.setItem('access_token', responseData.data.access_token);

      dispatch({
        type: LOGIN_SUCCESS,
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
