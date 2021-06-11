import AppHandledException from '../../../models/AppHandledException';
import { apiRequest, checkAuthStatus } from '../../../utils/apiRequest';

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
      const response = await apiRequest('/businesses/overview', 'GET');
      const responseData = await response.json();

      checkAuthStatus(response, dispatch);

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
