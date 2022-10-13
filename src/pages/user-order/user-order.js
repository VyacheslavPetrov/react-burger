import React, { memo, useEffect } from 'react';
import cn from 'classnames';
import styles from './user-order.module.css';
import { useParams, Redirect } from 'react-router-dom';
import PriceItem from '../../ui/price-item/price-item';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { WS_CONNECTION_START_AUTH, WS_CONNECTION_CLOSED_AUTH } from '../../services/actions/ws-actions-auth';
import Preloader from '../../components/preloader/preloader';
import { conversionDateForCard } from '../../utils/utils';
import { getIngredients } from '../../services/actions/ingredients';

function UserOrder() {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch({ type: WS_CONNECTION_START_AUTH });
      return () => ({ type: WS_CONNECTION_CLOSED_AUTH })
    },
    [dispatch]
  );

  const { loaded } = useSelector(store => store.ingredients)
  useEffect(() => {
    if (!loaded) {
      dispatch(getIngredients());
    }
  }, [dispatch, loaded]);

  const { allIngredients } = useSelector(store => store.ingredients)



  const { id } = useParams();
  const { orders } = useSelector(store => store.wsAuth.messages)
  const { wsConnected } = useSelector(store => store.ws)
  const filterOrders = (arr, id) => {
    return arr?.filter((el) => el.number === Number(id))[0]
  }
  const order = filterOrders(orders, id);
  const stringWithDay = conversionDateForCard(order?.createdAt);
  const burgerIngredients = (order?.ingredients.map(el => el = (allIngredients.filter(item => item._id === el))))?.flat()
  const arrUniqItem = Array.from(new Set(order?.ingredients))
  const bI = burgerIngredients?.reduce((acc, curr) => {
      const id = curr._id
      acc.item[id] = curr;
      acc.count[id] = (acc.count[id] || 0) + 1
      return acc
    }
    , { item: {}, count: {} })

  const burgerPrice = burgerIngredients?.reduce((acc, curr) => acc += curr.price, 0)
  const name = order?.name
  if (wsConnected && orders?.length && !order) return <Redirect to='/' />;
  const status =
    order?.status === 'done'
      ? { text: 'Выполнен', textColor: 'green' }
      : order?.status === 'pending'
      ? { text: 'Отменен', textColor: 'yellow' }
      : { text: 'Готовится', textColor: 'white' };

  if (!order) {
    return <Preloader />;
  }

  return (
    <div className={styles.container}>
      <span className={cn('text text_type_digits-default')}>#{id}</span>
      <h1
        className={cn(
          'text text_type_main-medium',
          'mb-3',
          'mt-10',
          styles.title
        )}
      >
        {name}
      </h1>
      <p
        className={cn(
          'text text_type_main-default',
          'mb-15',
          styles.status,
          styles[`status_color_${status.textColor}`]
        )}
      >
        {status.text}
      </p>
      <p className={cn('text text_type_main-medium', 'mb-6', styles.title)}>
        Состав:
      </p>
      <ul className={cn(styles.list, 'mb-10')}>
        {arrUniqItem.map((el, i) => {
          return <li className={cn(styles['list-item'], 'mr-6')} key={i}>
            <div className={cn(styles.icon, 'mr-4')}>
              <img src={bI.item[el]?.image_mobile} alt='Вкусная булка' className={cn(styles.image)} />
            </div>
            <p
              className={cn(
                styles.ingredient,
                'mr-4',
                'text text_type_main-default'
              )}
            >
              {bI.item[el]?.name}
            </p>
            <span className={cn('mr-1', 'text text_type_digits-default')}>
							{bI.count[el]} x{' '}
						</span>
            <PriceItem price={bI.item[el]?.price} />
          </li>
        })}
      </ul>
      <div className={styles.info}>
				<span
          className={cn('text text_type_main-default text_color_inactive')}
        >
					{stringWithDay}
				</span>
        <PriceItem price={burgerPrice} />
      </div>
    </div>
  );
}

export default memo(UserOrder);
