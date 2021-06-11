import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation, BrowserRouter } from 'react-router-dom';

import './css/style.scss';

import { focusHandling } from 'cruip-js-toolkit';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import AddInvoice from './pages/AddInvoice';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { authToken } from './utils/authUtils';
import AddClient from './pages/AddClient';
import Clients from './pages/Clients';
import Invoices from './pages/Invoices';
import Businesses from './pages/Businesses';
import Settings from './pages/Settings';
import AddBusiness from './pages/AddBusiness';
import GuestRoutes from './partials/GuestRouts';
import InvoiceDetails from './pages/InvoiceDetails';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

  if (!authToken()) {
    return <GuestRoutes />;
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Dashboard />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path='/add-invoice'>
            <AddInvoice />
          </Route>
          <Route exact path='/add-client'>
            <AddClient />
          </Route>
          <Route exact path='/add-business'>
            <AddBusiness />
          </Route>
          <Route exact path='/clients'>
            <Clients />
          </Route>
          <Route exact path='/invoices'>
            <Invoices />
          </Route>
          <Route exact path='/invoices/:id'>
            <InvoiceDetails />
          </Route>
          <Route exact path='/businesses'>
            <Businesses />
          </Route>
          <Route exact path='/settings'>
            <Settings />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
