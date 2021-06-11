import React, { useCallback, useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Banner from '../partials/Banner';
import { useDispatch, useSelector } from 'react-redux';
import ServerResponseError from '../partials/errors/ServerResponseError';
import AppHandledException from '../models/AppHandledException';
import * as invoiceActions from './../redux/business/actions/invoiceActions';
import * as dataActions from './../redux/business/actions/dataActions';
import * as clientActions from './../redux/business/actions/clientActions';

function AddInvoice() {
  const addInvoice = useSelector((state) => state.invoice.addInvoice);
  const clients = useSelector((state) => state.client.clients);
  const currencies = useSelector((state) => state.data.currencies);

  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(dataActions.getCurrencies());
    dispatch(clientActions.getClientes());
  }, [dispatch]);

  const [input, setInput] = useState({
    client_id: 0,
    currency_id: 0,
    vat: 0,
    summary: '',
  });

  const handleInputChange = (e) => {
    console.log(input, e.target.name, e.target.value);
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value,
    });
  };

  const [inputList, setInputList] = useState([{ item: '', quantity: '' }]);

  // handle input change
  const handleInputListChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        item: '',
        quantity: 1,
        unit_price: 0,
        amount: 0,
        discount: 0,
        // value: 0,
      },
    ]);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setIsLoading(true);

      input.invoice_items = inputList;

      console.log('************** invoice data:', input);

      try {
        dispatch(invoiceActions.addInvoice(input));
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
    [dispatch, inputList, input]
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
            <h1 className='text-3xl'>Add Invoice</h1>

            <div className='my-6'>
              {isLoading && <div>Loading...</div>}
              {addInvoice.message && (
                <p className='text-yellow-500 py-2 '>{addInvoice.message}</p>
              )}
              {addInvoice.error && (
                <ServerResponseError error={addInvoice.error} />
              )}
            </div>

            <form onSubmit={handleSubmit} className='w-full max-w-lg'>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full md:w-1/6 mt-1 md:mb-0'>
                  <input value='Item' className='p-2' disabled />
                </div>
                <div className='w-full md:w-1/6 mt-1 md:mb-0'>
                  <input value='Qty' disabled />
                </div>
                <div className='w-full md:w-1/6 mt-1 md:mb-0'>
                  <input value='Unit Price' disabled />
                </div>
                <div className='w-full md:w-1/6 mt-1 md:mb-0'>
                  <input value='Disc. %' disabled />
                </div>
                <div className='w-full md:w-1/6 mt-1 md:mb-0'>
                  <input value='Amount' disabled />
                </div>

                <div className='w-full md:w-1/6 mt-1 md:mb-0'>
                  <input value='Action' disabled />
                </div>
              </div>

              {inputList.map((x, i) => {
                return (
                  <div key={i}>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                      <div className='w-full md:w-1/6 mt-1 md:mb-0'>
                        <input
                          name='item'
                          placeholder='Item name'
                          value={x.item}
                          onChange={(e) => handleInputListChange(e, i)}
                          className='p-2'
                        />
                      </div>
                      <div className='w-full md:w-1/6 mt-1 md:mb-0'>
                        <input
                          type='number'
                          className='ml10'
                          name='quantity'
                          placeholder='qty'
                          value={x.quantity}
                          onChange={(e) => handleInputListChange(e, i)}
                        />
                      </div>
                      <div className='w-full md:w-1/6 mt-1 md:mb-0'>
                        <input
                          type='number'
                          className='ml10'
                          name='unit_price'
                          placeholder='price'
                          value={x.unit_price}
                          onChange={(e) => handleInputListChange(e, i)}
                        />
                      </div>
                      <div className='w-full md:w-1/6 mt-1 md:mb-0'>
                        <input
                          type='number'
                          className='ml10'
                          name='discount'
                          placeholder='discount'
                          value={x.discount}
                          onChange={(e) => handleInputListChange(e, i)}
                        />
                      </div>
                      <div className='w-full md:w-1/6 mt-1 md:mb-0'>
                        <input
                          type='number'
                          className='ml10'
                          name='amount'
                          value={`${
                            x.quantity * x.unit_price -
                              x.unit_price * x.discount * 0.01 * x.quantity || 0
                          }`}
                          onChange={(e) => handleInputListChange(e, i)}
                          disabled
                        />
                      </div>
                      <div className='w-full md:w-1/6 mt-1 md:mb-0'>
                        <div className='btn-box'>
                          {inputList.length !== 1 && (
                            <button
                              className='bg-red-500 text-red py-1.5 px-2'
                              onClick={() => handleRemoveClick(i)}
                            >
                              x
                            </button>
                          )}
                          {inputList.length - 1 === i && (
                            <button
                              className='bg-green-500 text-white py-1.5 px-2'
                              onClick={handleAddClick}
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <label>Select Client</label>
                  <br />
                  <select
                    onChange={handleInputChange}
                    value={input.client_id}
                    name='client_id'
                    className='block appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  >
                    <option value='0'>Select</option>
                    {clients.data.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
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
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <label>Currency</label>
                  <br />
                  <select
                    onChange={handleInputChange}
                    value={input.currency_id}
                    name='currency_id'
                    className='block appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  >
                    <option value='0'>Select</option>
                    {currencies.data.map((currency) => (
                      <option key={currency.id} value={currency.id}>
                        {currency.name}
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
              </div>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <label>Vat</label>
                  <br />
                  <input
                    onChange={handleInputChange}
                    value={input.vat}
                    name='vat'
                    type='number'
                    id='vat'
                    placeholder='vat'
                  />
                </div>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <label>Summary</label>
                  <br />
                  <input
                    onChange={handleInputChange}
                    value={input.address}
                    name='summary'
                    type='text'
                    id='summary'
                    placeholder='summary'
                  />
                </div>
              </div>

              <button
                type='submit'
                className='bg-blue-500 text-white px-2 py-1 rounded'
              >
                Save
              </button>
            </form>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default AddInvoice;
