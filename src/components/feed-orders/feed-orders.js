import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import OrdersItem from '../orders-item/orders-item';
import { ordersData } from '../../utils/data'
import styles from './feed-orders.module.css';

function FeedOrders() {
  return (
    <section>
      <h1 className={cn('text', 'text_type_main-large', 'mb-5')}>Лента заказов</h1>
      <ul className={cn(styles.list)} >
        {ordersData.map((el, i) => (
          <li className={cn(styles['list-item'], 'mb-4')} key={i}>
            <Link to={`/feed/${el.order.number}`} className={styles.link}>
              <OrdersItem number={el.order.number} name={el.name} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default memo(FeedOrders);