import React, { useCallback, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Banner from '../partials/Banner';
import { useDispatch, useSelector } from 'react-redux';
import ServerResponseError from '../partials/errors/ServerResponseError';
import AppHandledException from '../models/AppHandledException';
import * as businessActions from './../redux/business/actions/businessActions';

function AddBusiness() {
  const addBusiness = useSelector((state) => state.business.addBusiness);

  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [input, setInput] = useState({
    business_name: '',
    address: '',
    email: '',
  });

  const handleInputChange = (e) => {
    console.log(input, e.target.name, e.target.value);
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value,
    });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setIsLoading(true);

      try {
        await dispatch(businessActions.addBusiness(input));
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
    [dispatch, input]
  );

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            <h1 className='text-3xl'>Add Business</h1>

            <div className='my-6'>
              {isLoading && <div>Loading...</div>}
              {addBusiness.message && (
                <p className='text-yellow-500 py-2 '>{addBusiness.message}</p>
              )}
              {addBusiness.error && (
                <ServerResponseError error={addBusiness.error} />
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className='my-4'>
                <label>Business name</label>
                <br />
                <input
                  onChange={handleInputChange}
                  value={input.business_name}
                  name='business_name'
                  type='text'
                  id='business_name'
                  placeholder='business name'
                />
              </div>
              <div className='my-4'>
                <label>Address</label>
                <br />
                <input
                  onChange={handleInputChange}
                  value={input.address}
                  name='address'
                  type='text'
                  id='address'
                  placeholder='address'
                />
              </div>
              <div className='my-4'>
                <label>Email</label>
                <br />
                <input
                  onChange={handleInputChange}
                  value={input.email}
                  name='email'
                  type='email'
                  id='email'
                  placeholder='email'
                />
              </div>
              <button
                type='submit'
                className='bg-blue-500 text-white px-2 py-1 rounded'
              >
                Register
              </button>
            </form>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default AddBusiness;
