import React, { memo } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import Preloader from '../preloader/preloader';
import styles from './order-details.module.css';
const checkIcon = require('../../images/check.svg');

const OrderDetails = () => {
  const { orderRequest, orderFailed, currentOrder } = useSelector(
      (store: any) => store.ingredients
  );

  return (
      <div className={cn(styles.order, 'p-15')}>
        {orderRequest && <Preloader />}
        {orderFailed && 'Произошла ошибка'}
        {!orderRequest && !orderFailed && (
            <>
              <h1
                  className={cn(
                      styles.order__title,
                      'text',
                      'text_type_digits-large',
                      'mb-8'
                  )}
              >
                {currentOrder.order.number}
              </h1>
              <p
                  className={cn(styles.order__text, 'text', 'text_type_main-medium')}
              >
                {' '}
                идентификатор заказа
              </p>
              <img
                  src={checkIcon}
                  alt='иконка'
                  className={cn(styles.order__image, 'mt-15', 'mb-15')}
              />
              <p
                  className={cn(
                      styles.order__text,
                      'text',
                      'text_type_main-default',
                      'mb-2'
                  )}
              >
                {' '}
                Ваш заказ начали готовить
              </p>
              <p
                  className={cn(
                      styles.order__text,
                      'text',
                      'text_type_main-default',
                      'text_color_inactive'
                  )}
              >
                {' '}
                Дождитесь готовности на орбитальной станции
              </p>
            </>
        )}
      </div>
  );
}

export default memo(OrderDetails);
