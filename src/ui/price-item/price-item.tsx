import React, { FC } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TProps } from './types';
const styles = require('./price-item.module.css');

const PriceItem: FC<TProps> = ({ price, classMarg }) => {
  return (
    <span className={cn(styles['element-price'], 'text', [classMarg])}>
			{price}
      <CurrencyIcon type="primary" />
		</span>
  )
}

export default PriceItem;