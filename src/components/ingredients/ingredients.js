import React from "react"
import cn from "classnames"
import PropTypes from "prop-types"
import BurgerItem from "../burger-item/burger-item"
import {IngredientItems} from "../../utils/utils"

import styles from "./ingredients.module.css"


const Ingredients = ({title, array, id, createModal}) => {
    return (
        <div className={"mb-10"}>
            <h2 id={id} className={cn("text", "text_type_main-medium", "mb-6")}>{title}</h2>
            <ul className={cn(styles.list, "ml-4")}>
                {array.map((el) => <BurgerItem item={el} key={el._id} createModal={createModal} />)}
            </ul>
        </div>
    )
}

Ingredients.propTypes = {
    title: PropTypes.string,
    array: PropTypes.arrayOf(
        PropTypes.shape({
            category: PropTypes.string,
            items: PropTypes.arrayOf(PropTypes.shape({
                IngredientItems,
            }).isRequired),
            id: PropTypes.string,
            createModal: PropTypes.func
        })
    )
}

export default Ingredients