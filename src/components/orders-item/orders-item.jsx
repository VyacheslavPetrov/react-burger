import React, { memo } from 'react';
import cn from 'classnames';
import PriceItem from '../../ui/price-item/price-item';
import styles from './orders-item.module.css';
import bun01 from '../../images/bun-01.png';
import cheese from '../../images/cheese.png';
import core from '../../images/core.png';
import meat03 from '../../images/meat-03.png';
import sauce03 from '../../images/sauce-03.png';
import mineralRings from '../../images/mineral-rings.png';
import PropTypes from 'prop-types';


function OrdersItem({ number, name, status }) {
  const st = status === 'completed' ? { text: 'Выполнен', textColor: 'green' } :
    status === 'canceled' ? { text: 'Отменен', textColor: 'red' } : { text: 'Готовится', textColor: 'white' };

  return (
    <div className={cn(styles['orders-item'], 'p-6')}>
      <div className={cn(styles['orders-info'])}>
        <span className="text text_type_digits-default">#{number}</span>
        <span className={"text text_type_main-default text_color_inactive"}>Сегодня, 16:20 i-GMT+3</span>
      </div>
      <div>
        <h2 className={cn("text text_type_main-medium", 'mb-2')}>{name}</h2>
        {status ? <span className={cn("text text_type_main-default", styles[`status_color_${st.textColor}`])}>{st.text}</span> : null}
      </div>
      <div className={cn(styles['orders-info'])}>
        <ul className={cn(styles.list)}>
          <li className={styles['list-item']}
              style={{ zIndex: 5 }}>
            <div className={cn(styles.icon)}>
              <img src={bun01} alt='Вкусная булка' />
            </div>
          </li>
          <li className={styles['list-item']}
              style={{ zIndex: 4 }}>
            <div className={styles.icon}>
              <img src={meat03} alt='Вкусная булка' />
            </div>
          </li>
          <li className={styles['list-item']} style={{ zIndex: 3 }}>
            <div className={styles.icon}>
              <img src={core} alt='Вкусная булка' />
            </div>
          </li>
          <li className={styles['list-item']} style={{ zIndex: 2 }}>
            <div className={styles.icon}>
              <img src={mineralRings} alt='Вкусная булка' />
            </div>
          </li>
          <li className={styles['list-item']} style={{ zIndex: 1 }}>
            <div className={styles.icon}>
              <img src={sauce03} alt='Вкусная булка' />
            </div>
          </li>
          <li className={styles['list-item']} style={{}}>
            <div className={styles.icon}>
              <img src={cheese} alt='Вкусная булка' />
            </div>
            <div className={styles.overlay}>
              <span>+3</span>
            </div>
          </li>
        </ul>
        <PriceItem price={480} />
      </div>
    </div>
  )
}

OrdersItem.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string,
}

export default memo(OrdersItem);