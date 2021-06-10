import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../redux/user/actions/authActions';
import AppHandledException from '../../models/AppHandledException';
import ServerResponseError from '../errors/ServerResponseError';

// CSS
import './../css/Login.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';

export default function Login() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [authToken, setToken] = useState();

  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  const [email, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setIsLoading(true);

      try {
        await dispatch(authActions.login(email, password));
      } catch (err) {
        console.error(err);
        if (err instanceof AppHandledException) {
          setError(err.message);
        } else {
          setError('Something went wrong.');
        }
      }
      setIsLoading(false);
    },
    [dispatch, email, password]
  );

  useEffect(() => {
    const tokenString = localStorage.getItem('access_token');
    setToken(tokenString);
  }, [setToken, login]);

  if (authToken) {
    return <Dashboard />;
  }

  return (
    <div className='login-wrapper p-6'>
      <h1>Please Log In</h1>
      <div className='my-6'>
        {isLoading && <div>Loading...</div>}
        {login.message && (
          <p className='text-yellow-500 py-2'>{login.message}</p>
        )}
        {login.error && <ServerResponseError error={login.error} />}
      </div>

      <form onSubmit={handleSubmit}>
        <div className='my-4'>
          <label>Email address</label>
          <br />
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={email}
            type='email'
            id='email'
            placeholder='Enter email'
          />
          <br />
          <small id='emailHelp'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='my-4'>
          <label>Password</label>
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            id='password'
            placeholder='Password'
          />
        </div>

        <button type='submit'>Login</button>
      </form>
      <div className='py-4'>
        <label>
          <Link to='/register'>Register</Link>
        </label>
      </div>
    </div>
  );
}

Login.propTypes = {};
