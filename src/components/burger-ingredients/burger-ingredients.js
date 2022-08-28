import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredients/ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import { CURRENT_BURGER } from '../../services/actions/ingredients';
import { OPEN_MODAL } from '../../services/actions/modal';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    const [current, setCurrent] = useState('bread');
    const dispatch = useDispatch();
    const { bun, sauce, main } = useSelector(store => store.ingredients.allIngredients);
    const rootRef = useRef(null);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const handleScroll = () => {
        const bunDistance = Math.abs(rootRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
        const sauceDistance = Math.abs(rootRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
        const mainDistance = Math.abs(rootRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
        const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
        const currentHeader = minDistance === bunDistance ? 'bread' : minDistance === sauceDistance ? 'sauces' : 'fillings';
        setCurrent(prevState => (currentHeader === prevState.current ? prevState.current : currentHeader))
    }



    const renderModal = (item) => {
        dispatch({
            type: CURRENT_BURGER,
            item
        })
        dispatch({
            type: OPEN_MODAL,
            content: <IngredientDetails />
        })
    }

    useEffect(() => {
        document.querySelector(`#${current}`).scrollIntoView();
    }, [current])

    return (
      <section>
          <h1 className={cn('text', 'text_type_main-large', 'mb-5')}>Соберите бургер</h1>
          <div className={cn('text', 'text_type_main-default', 'mb-10', styles.menu)}>
              <Tab value='bread' active={current === 'bread'} onClick={setCurrent}>
                  Булки
              </Tab>
              <Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>
                  Соусы
              </Tab>
              <Tab value='fillings' active={current === 'fillings'} onClick={setCurrent}>
                  Начинки
              </Tab>
          </div>

          <section className={cn(styles.container)} ref={rootRef} onScroll={handleScroll}>
              <Ingredients title='Булки' array={bun} id="bread" renderModal={renderModal} ref={bunRef} />
              <Ingredients title='Соусы' array={sauce} id='sauces' renderModal={renderModal} ref={sauceRef} />
              <Ingredients title='Начинки' array={main} id='fillings' renderModal={renderModal} ref={mainRef} />
          </section>
      </section>
    )
}

export default BurgerIngredients;