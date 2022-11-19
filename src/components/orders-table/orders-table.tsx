import React, { memo } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { filterOrdersByStatus } from '../../utils/utils';
import { TOrder } from '../../types';
import styles from './orders-table.module.css';


const OrdersTable = () => {

    const { total, totalToday, orders } = useSelector((store: any) => store.ws.messages)
    const statusArrays = filterOrdersByStatus(orders)
    const doneArray = statusArrays?.done.slice(0, 30);

  return (
    <section className={cn(styles.container, 'pl-4')} >
      <div className={styles.table}>
        <div >
          <h2 className={cn("text text_type_main-medium", 'mb-6')}>Готовы:</h2>
          <ul className={cn(styles.list, styles['list_color_green'], "text text_type_digits-default")}>
              {doneArray?.map((el: TOrder) => (<li key={el._id} className={cn(styles['list-item'], 'mb-2', 'mr-8')}>{el.number}</li>))}
          </ul>
        </div>
        <div>
          <h2 className={cn("text text_type_main-medium", 'mb-6')}>В работе:</h2>
          <ul className={cn(styles.list, "text text_type_digits-default")}>
              {statusArrays?.pending.map((el: TOrder) => (<li key={el._id} className={cn(styles['list-item'], 'mb-2', 'mr-8')}>{el.number}</li>))}
          </ul>
        </div>
      </div>
      <div>
        <h2 className={cn("text text_type_main-medium")}>Выполнено за все время:</h2>
        <span className={cn("text text_type_digits-large", styles.count)}>{total || 0}</span>
      </div>
      <div>
        <h2 className={cn("text text_type_main-medium")}>Выполнено за сегодня:</h2>
        <span className={cn("text text_type_digits-large", styles.count)}>{totalToday || 0}</span>
      </div >
    </section >
  )

}

export default memo(OrdersTable);