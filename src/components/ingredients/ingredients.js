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
                _id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                proteins: PropTypes.number.isRequired,
                fat: PropTypes.number.isRequired,
                carbohydrates: PropTypes.number.isRequired,
                calories: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired,
                image: PropTypes.string.isRequired,
                image_mobile: PropTypes.string.isRequired,
                image_large: PropTypes.string.isRequired,
                __v: PropTypes.number
            }).isRequired),
            id: PropTypes.string,
            createModal: PropTypes.func
        })
    )
}

export default Ingredients