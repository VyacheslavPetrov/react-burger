import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const PriceItem = ({ price, classMarg }) => {
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