import React, { memo, useEffect } from 'react';
import cn from 'classnames';
import styles from './profile.module.css';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import OrdersItem from '../../components/orders-item/orders-item';
import { ordersData } from '../../utils/data';
import NavProfile from '../../components/nav-profile/nav-profile';
import FormsProfile from '../../components/forms-profile/forms-profile';
import ProfileOrders from '../../components/profile-orders/profile-orders';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/actions/auth';
import Preloader from '../../components/preloader/preloader';


function Profile() {

  const dispatch = useDispatch();
  const location = useLocation();
  const { getUserRequest } = useSelector(store => store.auth)

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (getUserRequest) {
    return (<Preloader />)
  }

  return (
    <div className={cn(styles.main, 'pt-10', 'pl-10', 'pr-10', 'mt-10')}>
      <NavProfile />
      <Switch>
        <Route path="/profile" exact={true}>
          <FormsProfile />
        </Route>
        <Route path="/profile/orders" exact={true} >
          <ProfileOrders />

        </Route>
        <Route>
          <div className={styles.container}><h1> 404 Здесь ничего нет</h1></div>
        </Route>
      </Switch>
    </div >
  );
}

export default memo(Profile);