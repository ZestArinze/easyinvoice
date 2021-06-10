import AppHandledException from '../../../models/AppHandledException';
import { authToken } from '../../../utils/authUtils';
import { API_BASE_PATH } from '../../../utils/constants.js';

export const HOME = 'HOME';
export const HOME_FAILURE = 'HOME_FAILURE';
export const HOME_SUCCESS = 'HOME_SUCCESS';
export const RESET = 'RESET';

export const reset = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET,
      data: null,
    });
  };
};

export const businessOverView = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(API_BASE_PATH + '/businesses/overview', {
        headers: {
          Authorization: `Bearer ${authToken()}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      console.log('-----------> businessOverView responseData: ', responseData);

      if (!response.ok) {
        if (responseData) {
          if (!responseData.status) {
            dispatch({
              type: HOME_FAILURE,
              data: responseData,
            });
            return;
          }
        }
        throw new AppHandledException('Network Error...');
      }

      dispatch({
        type: HOME_SUCCESS,
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
