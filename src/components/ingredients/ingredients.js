import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { Link, useLocation } from "react-router-dom";
import styles from './ingredients.module.css';


const Ingredients = React.forwardRef(({ title, array, id }, ref) => {
  const location = useLocation();
  return (
    <section className={"mb-10"} >
      <h2 id={id} ref={ref} className={cn("text", "text_type_main-medium", "mb-6")}>{title}</h2>
      <ul className={cn(styles.list, 'ml-4')}>
        {array.map((el) => (
          <li className={styles['list-item']} key={el._id}>
            <Link to={{
              pathname: `/ingredients/${el._id}`,
              state: { background: location }
            }}
                  className={styles.link}>
              <BurgerIngredient item={el} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
})

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
        __v: PropTypes.number,
      }).isRequired),
      id: PropTypes.string,
      renderModal: PropTypes.func
    })
  )
}

export default memo(Ingredients);