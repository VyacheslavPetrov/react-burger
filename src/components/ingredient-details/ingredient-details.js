import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./ingredient-details.module.css";
const IngredientDetails = ({image, name, description, calories, proteins, fat, carbohydrates}) => {

    return (
        <div className={cn(styles.content)}>
            <p className={cn("text", "text_type_main-large", "mb-5")}>Детали ингредиента</p>
            <div className={cn(styles.content__details, "pr-15", "pl-15")}>
                <img src={image} alt='icon'/>
                <h2 className={cn(styles.content__text, "text", "text_type_main-medium", "mt-4")}> {name}</h2>
                <p className={cn(styles.content__text, "text", "text_type_main-default", "mt-8", "mb-8")}>{description}</p>
                <ul className={cn(styles.list)}>
                    <li className={cn(styles.list__item, "text", "text_type_main-default", "text_color_inactive")}>
                        <p className={cn(styles["list__item-text"])}>Калории, ккал</p>
                        <span className={cn("mt-2", "text_type_digits-default")}>{calories}</span>
                    </li>
                    <li className={cn(styles.list__item, "text", "text_type_main-default", "text_color_inactive")}>
                        <p className={cn(styles["list__item-text"])}>Белки, г</p>
                        <span className={cn("mt-2", "text_type_digits-default")}>{proteins}</span>
                    </li>
                    <li className={cn(styles.list__item, "text", "text_type_main-default", "text_color_inactive")}>
                        <p className={cn(styles["list__item-text"])}>Жиры, г</p>
                        <span className={cn("mt-2", "text_type_digits-default")}>{fat}</span>
                    </li>
                    <li className={cn(styles.list__item, "text", "text_type_main-default", "text_color_inactive")}>
                        <p className={cn(styles["list__item-text"])}>Углеводы, г</p>
                        <span className={cn("mt-2", "text_type_digits-default")}>{carbohydrates}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

IngredientDetails.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
}

export default IngredientDetails;
