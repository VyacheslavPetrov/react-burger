import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import checkIcon from "../../images/check.svg"

import styles from "./order-details.module.css";

const OrderDetails = ({number}) => {
    return (
        <div className={cn(styles.order, "p-15")}>
            <p className={cn(styles.order__title, "text", "text_type_digits-large", 'mb-8')}>{number}</p>
            <p className={cn("text", "text_type_main-medium")}> идентификатор заказа</p>
            <img src={checkIcon} alt="icon" className={cn(styles.order__image, "mt-15", "mb-15")} />
            <p className={cn("text", "text_type_main-default", "mb-2")}> Ваш заказ начали готовить</p>
            <p className={cn("text", "text_type_main-default", "text_color_inactive")}> Дождитесь готовности на
                орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    number: PropTypes.string.isRequired
}

export default OrderDetails
