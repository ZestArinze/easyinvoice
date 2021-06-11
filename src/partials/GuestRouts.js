import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

export default function GuestRoutes() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path='/*'>
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
