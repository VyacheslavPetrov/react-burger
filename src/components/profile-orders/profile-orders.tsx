import React, { memo, useEffect } from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import OrdersItem from '../orders-item/orders-item';
import { useDispatch, useSelector } from '../../hooks';
import { WS_CONNECTION_START_AUTH, WS_CONNECTION_CLOSE_AUTH } from '../../services/constants/ws-actions-auth';
import { TOrder } from '../../types';
import styles from './profile-orders.module.css';

function ProfileOrders() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(
      () => {
        dispatch({ type: WS_CONNECTION_START_AUTH });
        return () => {
          dispatch({ type: WS_CONNECTION_CLOSE_AUTH })
          return;
        }
      },
      [dispatch]
  );

  const { orders } = useSelector((store) => store.wsAuth);
  return (
    <ul className={cn(styles.list, 'mb-20')}>
      {orders?.map((el: TOrder, i: number) => (
        <li className={cn(styles['list-item'])} key={i}>
          <Link
            to={{
              pathname: `/profile/orders/${el.number}`,
              state: { background: location }
            }}
            className={styles['burger-link']}
          >
            <OrdersItem
              number={el.number}
              name={el.name}
              ingredients={el.ingredients}
              createdAt={el.createdAt}
              status={el.status}
            />
          </Link>
        </li>
      ))
      }
    </ul >

  );
}

export default memo(ProfileOrders);
