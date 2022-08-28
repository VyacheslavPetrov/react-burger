import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


function PriceItem({price, classMarg}) {
    return (
        <span className={cn("constructor-element__price", 'text', [classMarg])}>
			{price}
            <CurrencyIcon type="primary" />
		</span>
    )
}

PriceItem.propTypes = {
    price: PropTypes.number,
    classMarg: PropTypes.string
}

export default PriceItem;