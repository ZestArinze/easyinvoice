import AppHandledException from '../../../models/AppHandledException';
import { API_BASE_PATH } from '../../../utils/constants.js';

export const REGISTER = 'REGISTER';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const RESET = 'RESET';
export const reset = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET,
      data: null,
    });
  };
};

export const register = (name, email, password, password_confirmation) => {
  return async (dispatch) => {
    try {
      const reqBody = {
        name,
        email,
        password,
        password_confirmation,
      };
      console.log('********** reqBody:', reqBody);

      const response = await fetch(API_BASE_PATH + '/auth/signup', {
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
              type: REGISTER_FAILURE,
              data: responseData,
            });
            return;
          }
        }
        throw new AppHandledException('Network Error...');
      }

      dispatch({
        type: REGISTER_SUCCESS,
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
