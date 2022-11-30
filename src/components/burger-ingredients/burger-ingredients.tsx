import React, { useState, useEffect, useRef, memo } from 'react';
import cn from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredients/ingredients';
import { filterArray } from '../../utils/functions';
import { useSelector } from '../../hooks';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    const [current, setCurrent] = useState<string>('bread');
    const { allIngredients } = useSelector(
        (store) => store.ingredients
    );

    const { bun, main, sauce } = filterArray(allIngredients);
    const rootRef = useRef<HTMLElement>(null);
    const bunRef = useRef<HTMLHeadingElement>(null);
    const sauceRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);

    const handleScroll = () => {
        if (rootRef && bunRef && sauceRef && mainRef && rootRef.current && bunRef.current && sauceRef.current && mainRef.current) {
            const bunDistance = Math.abs(
                rootRef.current.getBoundingClientRect().top -
                bunRef.current.getBoundingClientRect().top
            );
            const sauceDistance = Math.abs(
                rootRef?.current.getBoundingClientRect().top -
                sauceRef?.current.getBoundingClientRect().top
            );
            const mainDistance = Math.abs(
                rootRef?.current.getBoundingClientRect().top -
                mainRef?.current.getBoundingClientRect().top
            );
            const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
            const currentHeader =
                minDistance === bunDistance
                    ? 'bread'
                    : minDistance === sauceDistance
                    ? 'sauces'
                    : 'fillings';
            setCurrent((prevState) => currentHeader === prevState ? prevState : currentHeader);
        }
    };

    useEffect(() => {
        document.querySelector(`#${current}`)?.scrollIntoView();
    }, [current]);

    return (
        <section>
            <h1 className={cn('text', 'text_type_main-large', 'mb-5')}>
                Соберите бургер
            </h1>
            <div
                className={cn('text', 'text_type_main-default', 'mb-10', styles.menu)}
            >
                <Tab value='bread' active={current === 'bread'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab
                    value='fillings'
                    active={current === 'fillings'}
                    onClick={setCurrent}
                >
                    Начинки
                </Tab>
            </div>

            <section
                className={cn(styles.container)}
                ref={rootRef}
                onScroll={handleScroll}
            >
                <Ingredients
                    title='Булки'
                    array={bun}
                    id='bread'
                    ref={bunRef}
                />
                <Ingredients
                    title='Соусы'
                    array={sauce}
                    id='sauces'
                    ref={sauceRef}
                />
                <Ingredients
                    title='Начинки'
                    array={main}
                    id='fillings'
                    ref={mainRef}
                />
            </section>
        </section>
    );
}

export default memo(BurgerIngredients);
