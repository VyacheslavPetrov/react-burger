import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceItem from '../../ui/price-item/price-item';
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";

import styles from './burger-ingredient.module.css';

const BurgerIngredient = ({ item, renderModal }) => {

    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredient",
        item,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const { counts, bun } = useSelector(store => store.ingredients.burgerIngredients);
    const isBun = item.type === 'bun'
    const count = isBun && bun && bun._id === item._id ? 2 : counts[item._id] && counts[item._id]

    const opacity = isDrag ? 0.3 : 1;

    return (
      <div
        className={cn(styles.card)}
        ref={dragRef}
        style={{ opacity }}
        data-cy='ingredient'
      >
          <img
            className={cn(styles.image, 'mb-1')}
            src={item.image_large}
            alt={item.name}
          />
          {count ? <Counter count={count} size='small' /> : null}
          <PriceItem price={item.price} classMarg='mr-1' />
          <p
            className={cn(
              'text text_type_main-default'
            )}
          >
              {item.name}
          </p>
      </div>
    )
}

BurgerIngredient.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number,
    }).isRequired,
}

export default memo(BurgerIngredient);