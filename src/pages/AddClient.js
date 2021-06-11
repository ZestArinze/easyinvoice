import React, { useCallback, useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Banner from '../partials/Banner';
import { useDispatch, useSelector } from 'react-redux';
import ServerResponseError from '../partials/errors/ServerResponseError';
import AppHandledException from '../models/AppHandledException';
import * as clientActions from './../redux/business/actions/clientActions';
import * as businessActions from './../redux/business/actions/businessActions';

function AddClient() {
  const addClient = useSelector((state) => state.client.addClient);
  const businesses = useSelector((state) => state.business.businesses);

  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(businessActions.getBusinesses());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: '',
    email: '',
    address: '',
    phone_number: '',
    business_id: 0,
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
        await dispatch(clientActions.addClient(input));
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
            <h1 className='text-3xl'>Add Client</h1>

            <div className='my-6'>
              {isLoading && <div>Loading...</div>}
              {addClient.message && (
                <p className='text-yellow-500 py-2 '>{addClient.message}</p>
              )}
              {addClient.error && (
                <ServerResponseError error={addClient.error} />
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className='my-4'>
                <label>Client name</label>
                <br />
                <input
                  onChange={handleInputChange}
                  value={input.name}
                  name='name'
                  type='text'
                  id='name'
                  placeholder='client name'
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
                <label>Phone number</label>
                <br />
                <input
                  onChange={handleInputChange}
                  value={input.phone_number}
                  name='phone_number'
                  type='text'
                  id='phone_number'
                  placeholder='Phone'
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
              <div className='my-4'>
                <label>Business</label>
                <br />
                <select
                  onChange={handleInputChange}
                  value={input.business_id}
                  name='business_id'
                  className='block appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                >
                  <option value=''>Select</option>
                  {businesses.data.map((business) => (
                    <option key={business.id} value={business.id}>
                      {business.business_name}
                    </option>
                  ))}
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                  <svg
                    className='fill-current h-4 w-4'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                  </svg>
                </div>
              </div>
              <button
                type='submit'
                className='bg-blue-500 text-white px-2 py-1 rounded'
              >
                Add
              </button>
            </form>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default AddClient;
