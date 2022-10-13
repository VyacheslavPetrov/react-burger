import React from "react";
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import AppHeader from "../app-header/app-header";
import { Main, Login, Register, ForgotPassword, ResetPassword, Feed, Order, Profile, UserOrder } from '../../pages';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { ProtectedRoute } from '../protected-route';

import styles from './app.module.css'

const App = () => {

  const location = useLocation();
  const history = useHistory();
  const background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;

    return (
      <>
        <AppHeader />
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <Main />
          </Route>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
          <Route path="/register" exact={true}>
            <Register />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPassword />
          </Route>
          <Route path="/feed" exact={true}>
            <Feed />
          </Route>
          <Route path="/feed/:id" >
            <Order />
          </Route>
          <Route path="/profile/orders/:id" exact={true}>
            <UserOrder />
          </Route>
          <ProtectedRoute path='/profile/orders/:id' exact={true}>
            <Order />
          </ProtectedRoute>
          <ProtectedRoute path="/profile">
            <Profile />
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientDetails />
          </Route>
          <Route>
            <div className={styles.container}>
              <h1> 404 Здесь ничего нет</h1>
            </div>
          </Route>
        </Switch>
        {background &&
        (<>
            <Route path='/' exact={true} children={<Modal><OrderDetails /></Modal>} />
            <Route path='/ingredients/:id' children={<Modal><IngredientDetails /></Modal>} />
            <ProtectedRoute path='/profile/orders/:id' children={<Modal><UserOrder /></Modal>} />
            <Route path='/feed/:id' children={<Modal><Order /></Modal>} />
          </>
        )}
      </>
    );
}

export default App;