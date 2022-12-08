import React, { memo } from 'react';
import cn from 'classnames';
import { useParams } from "react-router-dom";
import Preloader from '../preloader/preloader';
import { TIngredient } from '../../types';
import { useSelector } from '../../hooks';
import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
    const { allIngredients } = useSelector((store) => store.ingredients)
    let { id } = useParams<{ id: string }>();
    const currentBurger = allIngredients.length ? allIngredients.find((el: TIngredient) => el._id === id) : null

    if (!currentBurger) {
        return (<Preloader />)
    }

    return (
        <div className={cn(styles.content)} data-cy='ingredient-details'>
            <h1
                className={cn(
                    styles.content__title,
                    'text',
                    'text_type_main-large',
                    'mb-5'
                )}
            >
                Детали ингредиента
            </h1>
            <div className={cn(styles.content__product, 'pr-15', 'pl-15')}>
                <img src={currentBurger.image} alt='иконка' className={cn(styles.content__image)} data-cy='ingredient-details-image'/>
                <h2
                    className={cn(
                        styles.content__text,
                        'text',
                        'text_type_main-medium',
                        'mt-4'
                    )}
                    data-cy='ingredient-details-name'
                >
                    {' '}
                    {currentBurger.name}
                </h2>
                {/*<p
                    className={cn(
                        styles.content__text,
                        'text',
                        'text_type_main-default',
                        'mt-8',
                        'mb-8'
                    )}
                >
                    Здесь будет описание
                </p>*/}
                <ul className={cn(styles.list)}>
                    <li
                        className={cn(
                            styles.list__item,
                            'text',
                            'text_type_main-default',
                            'text_color_inactive'
                        )}
                    >
                        <p className={cn(styles['list__item-text'])} data-cy='ingredient-details-calories'>Калории, ккал</p>
                        <span className={cn('mt-2', 'text_type_digits-default')}>
              {currentBurger.calories}
            </span>
                    </li>
                    <li
                        className={cn(
                            styles.list__item,
                            'text',
                            'text_type_main-default',
                            'text_color_inactive'
                        )}
                    >
                        <p className={cn(styles['list__item-text'])} data-cy='ingredient-details-proteins'>Белки, г</p>
                        <span className={cn('mt-2', 'text_type_digits-default')}>
              {currentBurger.proteins}
            </span>
                    </li>
                    <li
                        className={cn(
                            styles.list__item,
                            'text',
                            'text_type_main-default',
                            'text_color_inactive'
                        )}
                    >
                        <p className={cn(styles['list__item-text'])} data-cy='ingredient-details-fat'>Жиры, г</p>
                        <span className={cn('mt-2', 'text_type_digits-default')}>
              {currentBurger.fat}
            </span>
                    </li>
                    <li
                        className={cn(
                            styles.list__item,
                            'text',
                            'text_type_main-default',
                            'text_color_inactive'
                        )}
                    >
                        <p className={cn(styles['list__item-text'])} data-cy='ingredient-details-carbohydrates'>Углеводы, г</p>
                        <span className={cn('mt-2', 'text_type_digits-default')}>
              {currentBurger.carbohydrates}
            </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default memo(IngredientDetails);