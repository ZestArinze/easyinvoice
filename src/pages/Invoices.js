import React, { useCallback, useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Banner from '../partials/Banner';
import InvoiceListItem from './../partials/business/InvoiceListItem';
import { Link, Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as invoiceActions from './../redux/business/actions/invoiceActions';

function Invoices() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoice.invoices);

  const getInvoices = useCallback(() => {
    dispatch(invoiceActions.getInvoices());
  }, [dispatch]);

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto my-4'>
            <h1>Invoices</h1>
            <Link to='/add-invoice'>
              <button className='btn bg-indigo-500 hover:bg-indigo-600 text-white'>
                <svg
                  className='w-4 h-4 fill-current opacity-50 flex-shrink-0'
                  viewBox='0 0 16 16'
                >
                  <path d='M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z' />
                </svg>
                <span className='hidden xs:block ml-2'>Add Invoice</span>
              </button>
            </Link>

            {invoices.data.map((invoice, index) => (
              <Link to={`/invoices/${invoice.id}`} className='py-2'>
                <InvoiceListItem key={index} invoice={invoice} />
              </Link>
            ))}
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Invoices;
