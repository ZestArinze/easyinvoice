import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './../../css/login.css';
import * as registerActions from '../../redux/user/actions/registerActions';
import { Link, Redirect } from 'react-router-dom';
import AppHandledException from '../../models/AppHandledException';
import ServerResponseError from '../../partials/errors/ServerResponseError';

export default function Register({}) {
  const dispatch = useDispatch();
  const register = useSelector((state) => state.register);

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState();
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setPasswordConfirmation] = useState();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setIsLoading(true);

      try {
        await dispatch(
          registerActions.register(name, email, password, password_confirmation)
        );
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
    [dispatch, name, email, password, password_confirmation]
  );

  if (register.status) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='register-wrapper p-6'>
      <h1>Register</h1>

      <div className='my-6'>
        {isLoading && <div>Loading...</div>}
        {register.message && (
          <p className='text-yellow-500 py-2 '>{register.message}</p>
        )}
        {register.error && <ServerResponseError error={register.error} />}
      </div>

      <form onSubmit={handleSubmit}>
        <div className='my-4'>
          <label>Name</label>
          <br />
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            id='name'
            placeholder='Full name'
          />
        </div>
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
          <small id='emailHelp' className='form-text text-muted'>
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
        <div className='my-4'>
          <label>Confirm Password</label>
          <br />
          <input
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={password_confirmation}
            type='password'
            id='password_confirmation'
            placeholder='Re-enter password'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-2 py-1 rounded'
        >
          Register
        </button>
      </form>
      <div className='py-4'>
        <label>
          <Link to='/login' className='text-blue-600'>
            Login
          </Link>
        </label>
      </div>
    </div>
  );
}

Register.propTypes = {};
