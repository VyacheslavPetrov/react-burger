import React, {useContext, useEffect, useState} from "react";
import cn from "classnames";
import Ingredients from "../ingredients/ingredients";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {ModalContext} from "../../utils/modalContext";
import {IngredientsContext} from "../../utils/ingredientsContext";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css"

const BurgerIngredients = () => {
    const [current, setCurrent] = useState("bread")
    const {state} = useContext(IngredientsContext);
    const {setModal} = useContext(ModalContext);
    const {bun, sauce, main} = state.allIngredients;

    useEffect(() => {
        document.querySelector(`#${current}`).scrollIntoView();
    }, [current])

    const createModal = (item) => {
        setModal({
            visible: true,
            content: <IngredientDetails
                image={item.image}
                name={item.name}
                calories={item.calories}
                proteins={item.proteins}
                fat={item.fat}
                carbohydrates={item.carbohydrates}
            />
        })
    }

    return (
        <section>
            <p className={cn("text", "text_type_main-large", "mb-5")}>Соберите бургер</p>
            <div className={cn("text", "text_type_main-default", "mb-10", styles.menu)}>
                <Tab value="bread" active={current === "bread"} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="fillings" active={current === "fillings"} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <section className={cn(styles.container)}>
                <Ingredients title="Булки" array={bun} id="bread" createModal={createModal}/>
                <Ingredients title="Соусы" array={sauce} id="sauces" createModal={createModal}/>
                <Ingredients title="Начинки" array={main} id="fillings" createModal={createModal}/>
            </section>
        </section>
    )
}

export default BurgerIngredients;