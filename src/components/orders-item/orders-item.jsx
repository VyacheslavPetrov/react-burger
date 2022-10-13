import React, { memo } from 'react';
import cn from 'classnames';
import PriceItem from '../../ui/price-item/price-item';
import styles from './orders-item.module.css';
import { useSelector } from 'react-redux';
import { conversionDateForCard } from '../../utils/utils';
import PropTypes from 'prop-types';

function OrdersItem({ number, name, ingredients, createdAt, status }) {

  const { allIngredients } = useSelector(store => store.ingredients)
  const stringWithDay = conversionDateForCard(createdAt);
  const burgerIngredients = (ingredients.map(el => el = (allIngredients.filter(item => item._id === el)))).flat()
  const burgerItem = burgerIngredients.slice(0, 6)
  const count = burgerIngredients.length;
  let zI = 6;
  const numberIngredients = count - 6
  const burgerPrice = burgerIngredients.reduce((acc, curr) => acc += curr.price, 0)

  const st =
    status === 'done'
      ? { text: 'Выполнен', textColor: 'green' }
      : status === 'pending'
      ? { text: 'Готовится', textColor: 'yellow' }
      : { text: 'Создан', textColor: 'white' };

  return (
    <div className={cn(styles['orders-item'], 'p-6')}>
      <div className={cn(styles['orders-info'])}>
        <span className='text text_type_digits-default'>#{number}</span>
        <span className={'text text_type_main-default text_color_inactive'}>
          {stringWithDay}
        </span>
      </div>
      <div>
        <h2 className={cn('text text_type_main-medium', 'mb-2')}>{name}</h2>
        {status ? (
          <span
            className={cn(
              'text text_type_main-default',
              styles[`status_color_${st.textColor}`]
            )}
          >
            {st.text}
          </span>
        ) : null}
      </div>
      <div className={cn(styles['orders-info'])}>
        <ul className={cn(styles.list)}>
          {burgerItem.map((el, i) => {
            zI -= 1
            return (
              <li className={styles['list-item']} key={i} style={{ zIndex: zI }}>
                <div className={cn(styles.icon)}>
                  <img src={el.image_mobile} className={cn(styles.image)} alt='ингредиент бургера' />
                </div>
              </li>
            )
          })}
          {count > 6 ? (<div className={styles.overlay}>
            <span>{`+${numberIngredients}`}</span>
          </div>) : null}
        </ul>
        <PriceItem price={burgerPrice} />
      </div>
    </div >
  );
}

OrdersItem.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  createdAt: PropTypes.string.isRequired,
  status: PropTypes.string,
};

export default memo(OrdersItem);