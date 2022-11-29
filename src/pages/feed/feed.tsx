import React, { memo, useEffect } from 'react';
import cn from 'classnames';
import FeedOrders from '../../components/feed-orders/feed-orders';
import OrdersTable from '../../components/orders-table/orders-table';
import { useDispatch } from '../../hooks';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/constants/ws-actions';
import styles from './feed.module.css';

function Feed() {

    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch({ type: WS_CONNECTION_START });
            return () => {
                dispatch({ type: WS_CONNECTION_CLOSE })
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