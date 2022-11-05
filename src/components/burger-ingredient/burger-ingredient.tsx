import React, { memo, FC } from 'react';
import cn from 'classnames';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceItem from '../../ui/price-item/price-item';
import { useSelector } from 'react-redux';
import { COUNT_BUN } from '../../constants/constants';
import { useDrag } from 'react-dnd';
import { TIngredient } from '../../types';

import styles from './burger-ingredient.module.css';

const BurgerIngredient: FC<TIngredient> = (item) => {

    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredient",
        item,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const { counts, bun } = useSelector(
        (store: any) => store.ingredients.burgerIngredients
    );
    const isBun = item.type === 'bun'
    const count = isBun && bun && bun._id === item._id ? COUNT_BUN : counts[item._id] && counts[item._id]

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

export default memo(BurgerIngredient);