import React, { memo } from 'react';
import cn from 'classnames';
import styles from './order-details.module.css';
import checkIcon from '../../images/check.svg';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
  const { orderRequest, orderFailed, currentOrder } = useSelector(store => store.ingredients);

  return (
    <div className={cn(styles.order, 'p-15')}>
      {orderRequest && 'Загрузка...'}
      {orderFailed && 'Произошла ошибка'}
      {!orderRequest &&
      !orderFailed &&
      <>
        <h1 className={cn('text', 'text_type_digits-large', 'mb-8')}>{currentOrder.order.number}</h1>
        <p className={cn('text', 'text_type_main-medium')} > идентификатор заказа</p>
        <img src={checkIcon} alt='иконка' className={cn(styles.order__image, 'mt-15', 'mb-15')} />
        <p className={cn('text', 'text_type_main-default', 'mb-2')} > Ваш заказ начали готовить</p>
        <p className={cn('text', 'text_type_main-default', 'text_color_inactive')} > Дождитесь готовности на орбитальной станции</p>
      </>
      }
    </div>
  );
}



export default memo(OrderDetails);
