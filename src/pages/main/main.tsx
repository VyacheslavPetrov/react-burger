import React, { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { TIngredient } from '../../types';
import { useSelector, useDispatch } from '../../hooks';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ADD_INGREDIENTS, INCREASE_INGREDIENT } from '../../services/constants/ingredients';
import Preloader from '../../components/preloader/preloader';
import styles from './main.module.css';


function Main() {
    const { isLoading, hasError, loaded } = useSelector(
        (store) => store.ingredients
    );

    const dispatch = useDispatch();

    const handleDrop = (item: TIngredient) => {
        const newItem = { ...item, productId: uuidv4() };
        dispatch({
            type: ADD_INGREDIENTS,
            item: newItem
        })
        dispatch({
            type: INCREASE_INGREDIENT,
            key: item._id,
            typeItem: item.type
        })
    };

    return (
      <main className={cn(styles.main, 'p-10')}>
          {isLoading && <Preloader />}
          {hasError && 'Произошла ошибка'}
          {!isLoading &&
          !hasError &&
          loaded &&
          <DndProvider backend={HTML5Backend}>
              <div className={styles.columns}>
                  <BurgerIngredients />
                  <BurgerConstructor onDropHandler={handleDrop} />
              </div>
          </DndProvider>
          }
      </main >
    )
}

export default memo(Main);
