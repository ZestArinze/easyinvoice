import AppHandledException from '../models/AppHandledException';
import { LOGOUT } from '../redux/user/actions/authActions';
import { authToken } from './authUtils';
import { API_BASE_PATH } from './constants.js';

export const apiRequest = async (
  endpoint,
  method = 'GET',
  reqBody = {},
  additionalHeaders = {},
  withAuthToken = true
) => {
  try {
    console.log('************* START apiRequest ************');
    console.log({
      endpoint,
      method,
      reqBody,
    });

    let reqHeaders = {
      ...additionalHeaders,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (withAuthToken) {
      reqHeaders['Authorization'] = `Bearer ${authToken()}`;
    }

    let response;

    const url = `${API_BASE_PATH}${endpoint}`;
    if (method === 'GET' || method === 'get') {
      response = fetch(url, {
        headers: reqHeaders,
      });
    } else {
      response = fetch(url, {
        method: method,
        headers: reqHeaders,
        body: JSON.stringify(reqBody),
      });
    }

    console.log('************* END apiRequest ************');

    return response;
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

export const checkAuthStatus = (response, dispatch) => {
  if (response.status === 401) {
    dispatch({
      type: LOGOUT,
      data: null,
    });
    localStorage.removeItem('access_token');
  }
};
