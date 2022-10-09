import React, { memo } from 'react';
import cn from 'classnames';
import styles from './order.module.css';
import { useParams, Redirect } from 'react-router-dom';
import PriceItem from '../../ui/price-item/price-item';
import { ordersData } from '../../utils/data';

import bun01 from '../../images/bun-01.png';
import cheese from '../../images/cheese.png';
import core from '../../images/core.png';
import meat03 from '../../images/meat-03.png';
import sauce03 from '../../images/sauce-03.png';
import mineralRings from '../../images/mineral-rings.png';

function Order() {
  const { id } = useParams();
  const order = ordersData.filter(el => el.order.number === Number(id))
  if (order.length === 0) return <Redirect to="/" />
  console.log(order)
  const name = order[0].name;
  const status = order[0].order.status === 'completed' ? { text: 'Выполнен', textColor: 'green' } :
    order[0].order.status === 'canceled' ? { text: 'Отменен', textColor: 'red' } : { text: 'Готовится', textColor: 'white' };

  return (
    <div className={styles.container}>
      <div>
        <span className={cn("text text_type_digits-default")}>#{id}</span>
        <h1 className={cn("text text_type_main-medium", 'mb-3', 'mt-10', styles.title)}>{name}</h1>
        <p className={cn("text text_type_main-default", 'mb-15', styles.status, styles[`status_color_${status.textColor}`])}>{status.text}</p>
        <p className={cn("text text_type_main-medium", 'mb-6', styles.title)}>Состав:</p>
        <ul className={cn(styles.list, 'mb-10')}>
          <li className={cn(styles['list-item'], 'mr-6')}>
            <div className={cn(styles.icon, 'mr-4')}>
              <img src={bun01} alt='Вкусная булка' />
            </div>
            <p className={cn(styles.ingredient, 'mr-4', "text text_type_main-default")}>Флюоресцентная булка R2-D3</p>
            <span className={cn('mr-1', 'text text_type_digits-default')}>2 x </span>
            <PriceItem price={20} />
          </li>
          <li className={cn(styles['list-item'], 'mr-6')}>
            <div className={cn(styles.icon, 'mr-4')}>
              <img src={core} alt='Вкусная булка' />
            </div>
            <p className={cn(styles.ingredient, 'mr-4', "text text_type_main-default")}>Флюоресцентная булка R2-D3</p>
            <span className={cn('mr-1', 'text text_type_digits-default')}>1 x </span>
            <PriceItem price={300} />
          </li>
          <li className={cn(styles['list-item'], 'mr-6')}>
            <div className={cn(styles.icon, 'mr-4')}>
              <img src={meat03} alt='Вкусная булка' />
            </div>
            <p className={cn(styles.ingredient, 'mr-4', "text text_type_main-default")}>Флюоресцентная булка R2-D3</p>
            <span className={cn('mr-1', 'text text_type_digits-default')}>1 x </span>
            <PriceItem price={80} />
          </li>
          <li className={cn(styles['list-item'], 'mr-6')}>
            <div className={cn(styles.icon, 'mr-4')}>
              <img src={sauce03} alt='Вкусная булка' />
            </div>
            <p className={cn(styles.ingredient, 'mr-4', "text text_type_main-default")}>Флюоресцентная булка R2-D3</p>
            <span className={cn('mr-1', 'text text_type_digits-default')}>3 x </span>
            <PriceItem price={70} />
          </li>
          <li className={cn(styles['list-item'], 'mr-6')}>
            <div className={cn(styles.icon, 'mr-4')}>
              <img src={cheese} alt='Вкусная булка' />
            </div>
            <p className={cn(styles.ingredient, 'mr-4', "text text_type_main-default")}>Флюоресцентная булка R2-D3</p>
            <span className={cn('mr-1', 'text text_type_digits-default')}>1 x </span>
            <PriceItem price={200} />
          </li>
          <li className={cn(styles['list-item'], 'mr-6')}>
            <div className={cn(styles.icon, 'mr-4')}>
              <img src={mineralRings} alt='Вкусная булка' />
            </div>
            <p className={cn(styles.ingredient, 'mr-4', "text text_type_main-default")}>Флюоресцентная булка R2-D3</p>
            <span className={cn('mr-1', 'text text_type_digits-default')}>1 x </span>
            <PriceItem price={200} />
          </li>
        </ul>
        <div className={styles.info}>
          <span className={cn("text text_type_main-default text_color_inactive")}>Вчера, 13:50 i-GMT+3</span>
          <PriceItem price={540} />
        </div>

      </div>
    </div >
  );
}

export default memo(Order);