import React, {useContext} from "react"
import cn from "classnames"
import {v4 as uuidv4} from "uuid"
import OrderDetails from "../order-details/order-details"
import PriceItem from "../price-item/price-item"
import {createOrders, getCost} from "../../utils/utils"
import {IngredientsContext} from "../../utils/ingredientsContext"
import {ModalContext} from "../../utils/modalContext"
import {Button, ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./burger-constructor.module.css"

const BurgerConstructor = () => {
    const {setModal} = useContext(ModalContext)
    const {state, setState} = useContext(IngredientsContext)
    const {bun, otherIngredients} = state.burgerIngredients

    const handleClick = () => {
        createOrders(otherIngredients.map(el => el._id))
            .then((data) => {
                setModal({
                    visible: true,
                    content: <OrderDetails number={data.order.number.toString()} />
                })
            })
            .catch((err) => {
                (console.log(err))
            })
    }

    const deleteIngredient = (item) => {
        setState({
            ...state,
            burgerIngredients: {
                ...state.burgerIngredients,
                otherIngredients: [...state.burgerIngredients.otherIngredients.filter(el => el._id !== item._id)]
            }
        })
    }

    return (
        <section className={cn(styles.container, "pl-4")}>
            <div className={"mr-8"}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <ul className={cn(styles.list, "pr-4")}>
                {otherIngredients.map(el => (
                    <li className={styles.item} key={uuidv4()}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={el.name}
                            price={el.price}
                            thumbnail={el.image}
                            onClick={deleteIngredient}
                        />
                    </li>
                ))}
            </ul>
            <div className={"mr-8"}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <div className={cn(styles.order, "mt-10")}>
                <PriceItem price={getCost (bun, otherIngredients)} classMarg="mr-10" classText="text_type_digits-medium" />
                <Button type="primary" size="large" onClick={handleClick}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor