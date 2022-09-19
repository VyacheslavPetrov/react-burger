import React, { memo } from 'react';
import cn from 'classnames';
import styles from './orders-table.module.css';


function OrdersTable() {
  return (
    <section className={cn(styles.container, 'pl-4')} >
      <div className={styles.table}>
        <div >
          <h2 className={cn("text text_type_main-medium", 'mb-6')}>Готовы:</h2>
          <ul className={cn(styles.list, styles['list_color_green'], "text text_type_digits-default")}>
            <li className={'mb-2'}>034533</li>
            <li className={'mb-2'}>034532</li>
            <li className={'mb-2'}>034530</li>
            <li className={'mb-2'}>034527</li>
            <li className={'mb-2'}>034525</li>
          </ul>
        </div>
        <div>
          <h2 className={cn("text text_type_main-medium", 'mb-6')}>В работе:</h2>
          <ul className={cn(styles.list, "text text_type_digits-default")}>
            <li className={'mb-2'}>034538</li>
            <li className={'mb-2'}>034541</li>
            <li className={'mb-2'}>034542</li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className={cn("text text_type_main-medium")}>Выполнено за все время:</h2>
        <span className={cn("text text_type_digits-large", styles.count)}>28 752</span>
      </div>
      <div>
        <h2 className={cn("text text_type_main-medium")}>Выполнено за сегодня:</h2>
        <span className={cn("text text_type_digits-large", styles.count)}>138</span>
      </div >
    </section >
  )

}

export default memo(OrdersTable);