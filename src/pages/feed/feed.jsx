import React, { memo } from 'react';
import cn from 'classnames';
import styles from './feed.module.css';
import FeedOrders from '../../components/feed-orders/feed-orders';
import OrdersTable from '../../components/orders-table/orders-table';

function Feed() {
  return (
    <div className={cn(styles.columns, 'p-10')}>
      <FeedOrders />
      <OrdersTable />
    </div>
  );
}

export default memo(Feed);