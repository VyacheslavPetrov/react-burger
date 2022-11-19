import React, { memo, FC } from 'react';
import cn from 'classnames';
import PriceItem from '../../ui/price-item/price-item';
import { useSelector } from 'react-redux';
import { conversionDateForCard, getPrice, getBurgerIngredients } from '../../utils/utils';
import { getStatus } from '../../utils/utils';
import { NUNBER_OF_ELEMENTS_TO_BE_DRAWN } from '../../constants/constants';
import { TProps } from './types';
import { TIngredient } from '../../types';
import styles from './orders-item.module.css';


const OrdersItem: FC<TProps> = ({ number, name, ingredients, createdAt, status }) => {
    const { allIngredients } = useSelector((store: any) => store.ingredients);
    const stringWithDay = conversionDateForCard(createdAt);
    const burgerIngredients = getBurgerIngredients(ingredients, allIngredients);
    const burgerItem = burgerIngredients.slice(0, NUNBER_OF_ELEMENTS_TO_BE_DRAWN);
    const count = burgerIngredients.length;
    let zI = NUNBER_OF_ELEMENTS_TO_BE_DRAWN;
    const numberIngredients = count - NUNBER_OF_ELEMENTS_TO_BE_DRAWN;
    const burgerPrice = getPrice(burgerIngredients);
    const st = status ? getStatus(status) : null;


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
                            styles[`status_color_${st?.textColor}`]
                        )}
                    >
            {st?.text}
          </span>
                ) : null}
            </div>
            <div className={cn(styles['orders-info'])}>
                <ul className={cn(styles.list)}>
                    {burgerItem.map((el: TIngredient, i: number) => {
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
export default memo(OrdersItem);
