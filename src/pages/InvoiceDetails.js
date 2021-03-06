import React, { useCallback, useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Banner from '../partials/Banner';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as invoiceActions from '../redux/business/actions/invoiceActions';
import InvoiceItemListItem from '../partials/business/InvoiceItemListItem';

function InvoiceDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const invoiceItems = useSelector((state) => state.invoice.invoiceItems);

  let { id } = useParams();

  const getInvoiceItems = useCallback(() => {
    dispatch(invoiceActions.getInvoiceItems(id));
  }, [dispatch, id]);

  useEffect(() => {
    getInvoiceItems();
  }, [getInvoiceItems]);

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
            <h1 className='text-3xl my-3'>
              Invoice {invoiceItems.data.invoice_number}
            </h1>
            <div>
              <span className='mx-2'>
                Subtotal: {invoiceItems.data.subtotal}
              </span>
              <span className='mx-2'>Total: {invoiceItems.data.total}</span>
              <span className='mx-2'>VAT: {invoiceItems.data.vat}</span>
            </div>
            <table className='border-collapse border border-green-800 ...'>
              <thead>
                <tr>
                  <th className='border border-green-600'>Item</th>
                  <th className='border border-green-600'>Unit Price</th>
                  <th className='border border-green-600'>Quantity</th>
                  <th className='border border-green-600'>Discount</th>
                  <th className='border border-green-600'>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.data.invoice_items &&
                  invoiceItems.data.invoice_items.map((invoiceItem) => (
                    <>
                      <InvoiceItemListItem
                        key={invoiceItem.id}
                        invoiceItem={invoiceItem}
                      />
                      <hr />
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default InvoiceDetails;
