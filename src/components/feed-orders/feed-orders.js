import React, { memo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import OrdersItem from '../orders-item/orders-item';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import styles from './feed-orders.module.css';

function FeedOrders() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { loaded } = useSelector(store => store.ingredients)
  useEffect(() => {
    if (!loaded) {
      dispatch(getIngredients());
    }
  }, [dispatch, loaded]);
  const { orders } = useSelector(store => store.ws.messages)

  return (
    <section>
      <h1 className={cn('text', 'text_type_main-large', 'mb-5')}>Лента заказов</h1>
      <ul className={cn(styles.list)} >
        {orders?.map((el) => (
          <li className={cn(styles['list-item'], 'mb-4')} key={el._id}>
            <Link to={{ pathname: `/feed/${el.number}`, state: { background: location }}} className={styles.link}>
              <OrdersItem
                number={el.number}
                name={el.name}
                ingredients={el.ingredients}
                createdAt={el.createdAt} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default memo(FeedOrders);