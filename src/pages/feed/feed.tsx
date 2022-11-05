import React, { memo, useEffect } from 'react';
import cn from 'classnames';
import FeedOrders from '../../components/feed-orders/feed-orders';
import OrdersTable from '../../components/orders-table/orders-table';
import { useDispatch } from 'react-redux';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/actions/ws-actions';
import styles from './feed.module.css';

function Feed() {

    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch({ type: WS_CONNECTION_START });
            return () => {
                dispatch({ type: WS_CONNECTION_CLOSE })
                return;
            }
        },
    [dispatch]
    );

  return (
    <div className={cn(styles.columns, 'p-10')}>
      <FeedOrders />
      <OrdersTable />
    </div>
  );
}

export default memo(Feed);