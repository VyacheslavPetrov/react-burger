import React, { memo, useEffect } from 'react';
import cn from 'classnames';
import { useParams, Redirect, useRouteMatch } from 'react-router-dom';
import PriceItem from '../../ui/price-item/price-item';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getOrder, getUserOrder } from '../../services/actions/ingredients';
import Preloader from '../../components/preloader/preloader';
import { conversionDateForCard, getStatus, getPrice, getBurgerIngredients, getBurgerIngredientsObjWithCount } from '../../utils/utils';
import styles from './order.module.css';

function Order() {
    const dispatch = useDispatch();
    const isProfile = !!useRouteMatch("/profile");
    const { id } = useParams<{ id: string }>();
    useEffect(
        () => {
            dispatch(isProfile
                ? getUserOrder(id)
                : getOrder(id)
            )
        },
        [dispatch, isProfile, id]
    );
    const { allIngredients } = useSelector((store: any) => store.ingredients)
    const order = useSelector((store: any) => store.ingredients.currentOrder)
    const { orderLoaded } = useSelector((store: any) => store.ingredients)
    const stringWithDay = conversionDateForCard(order?.createdAt);
    const burgerIngredients = getBurgerIngredients(order?.ingredients, allIngredients)
    const arrUniqItem: Array<string> = Array.from(new Set(order?.ingredients))
    const bI = getBurgerIngredientsObjWithCount(burgerIngredients)
    const burgerPrice = getPrice(burgerIngredients)
    const name = order?.name
    const status = order?.status;
    const st = status ? getStatus(status) : null;
    if (orderLoaded && !order) return <Redirect to='/' />;


    if (!order) {
        return <Preloader />;
    }

    return (
        <div className={styles.container}>
            <span className={cn('text text_type_digits-default')}>#{id}</span>
            <h1
                className={cn(
                    'text text_type_main-medium',
                    'mb-3',
                    'mt-10',
                    styles.title
                )}
            >
                {name}
            </h1>
            <p
                className={cn(
                    'text text_type_main-default',
                    'mb-15',
                    styles.status,
                    styles[`status_color_${st?.textColor}`]
                )}
            >
                {st?.text}
            </p>
            <p className={cn('text text_type_main-medium', 'mb-6', styles.title)}>
                Состав:
            </p>
            <ul className={cn(styles.list, 'mb-10')}>
                {arrUniqItem.map((el: string, i: number) => {
                    return <li className={cn(styles['list-item'], 'mr-6')} key={i}>
                        <div className={cn(styles.icon, 'mr-4')}>
                            <img src={bI.item[el]?.image_mobile} alt='Вкусная булка' className={cn(styles.image)} />
                        </div>
                        <p
                            className={cn(
                                styles.ingredient,
                                'mr-4',
                                'text text_type_main-default'
                            )}
                        >
                            {bI.item[el]?.name}
                        </p>
                        <span className={cn('mr-1', 'text text_type_digits-default')}>
              {bI.count[el]} x{' '}
            </span>
                        <PriceItem price={bI.item[el]?.price} />
                    </li>
                })}
            </ul>
            <div className={styles.info}>
        <span
            className={cn('text text_type_main-default text_color_inactive')}
        >
          {stringWithDay}
        </span>
                <PriceItem price={burgerPrice} />
            </div>
        </div>
    );
}

export default memo(Order);
