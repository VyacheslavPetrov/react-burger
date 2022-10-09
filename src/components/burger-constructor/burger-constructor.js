import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceItem from '../../ui/price-item/price-item';
import { calculationCost } from '../../utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { DELETE_INGREDIENT, DECREASE_INGREDIENT, UPDATE_CONSTRUCTOR, createOrder } from '../../services/actions/ingredients'
import { useDrop } from 'react-dnd';
import BurgerItem from '../burger-item/burger-item';
import Preloader from '../preloader/preloader';
import { push } from 'connected-react-router';
import { useLocation, useHistory } from 'react-router-dom';

import styles from './burger-constructor.module.css';


const BurgerConstructor = ({ onDropHandler }) => {
  const { bun, otherIngredients } = useSelector(store => store.ingredients.burgerIngredients);
  const { orderRequest } = useSelector((store) => store.ingredients)
  const location = useLocation();
  const history = useHistory();
  const hasToken = localStorage.getItem('refreshToken')
  const dispatch = useDispatch();

  const [{ canDrop, isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId) {
      onDropHandler(itemId);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  });

  const handleClick = () => {
    if (hasToken) {
      const ingredientsId = otherIngredients.map((el) => el._id);
      dispatch(createOrder([bun._id, ...ingredientsId, bun._id]));
      history.push({
        pathname: '/',
        state: {
          background: location
        }
      });
    } else {
      dispatch(push('/login'));
    }
  };

  const isActive = canDrop && isHover;
  let classModificator = isActive ? 'burger-container_active' : canDrop ? 'burger-container_candrop' : ''

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: UPDATE_CONSTRUCTOR,
      toIndex: hoverIndex,
      fromIndex: dragIndex
    })
  }, [dispatch]);

  if (orderRequest) {
    return (<Preloader />)
  }

  return (
    <section className={cn(styles.container, 'pl-4')} >
      <div className={cn(styles['burger-container'], styles[classModificator])}
           ref={dropTarget}
           data-cy='drop-target'
      >
        {bun && <div className={'mr-8'} data-cy="up-bun">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>}

        <ul className={cn(styles.list, 'pr-4')} data-cy="other-ingredients-container" >
          {otherIngredients.map((el, i) => {
            const deleteIngredient = () => {
              dispatch({
                type: DELETE_INGREDIENT,
                id: el.productId
              })
              //el.type !== 'bun' &&
              dispatch({
                type: DECREASE_INGREDIENT,
                key: el._id,
                typeItem: el.type
              })
            }
            return (
              <BurgerItem item={el} index={i} key={el.productId} deleteIngredient={deleteIngredient} moveItem={moveItem} />
            )
          })}
        </ul>
        {
          bun && <div className={'mr-8'} data-cy="down-bun" >
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        }
      </div>

      <div className={cn(styles.order, 'mt-10')}>
        {otherIngredients.length || bun ? <PriceItem price={calculationCost(bun, otherIngredients)} classMarg='mr-10' classText='text_type_digits-medium' /> : null}
        {bun && <Button type="primary" size="large" onClick={handleClick}>
          Оформить заказ
        </Button>}
      </div>

    </section >
  )

}

BurgerConstructor.propTypes = {
  onDropHandler: PropTypes.func.isRequired
}

export default memo(BurgerConstructor);