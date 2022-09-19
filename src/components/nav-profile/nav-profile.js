import React, { memo } from 'react';
import cn from 'classnames';
import styles from './nav-profile.module.css';
import { NavLink } from 'react-router-dom';

const NewProfile = () => {
  return (<div className={cn(styles.nav)}>
    <ul className={cn(styles['list-nav'], 'mb-20')}>
      <li>
        <NavLink exact to="/profile" className={cn(styles.link, 'pt-4', 'pb-4', 'pr-5', 'mr-2', "text text_type_main-medium text_color_inactive")} activeClassName={styles.link_active} >
          <span className={cn('ml-2')}>Профиль</span>
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/profile/orders" className={cn(styles.link, 'pt-4', 'pb-4', 'pr-5', 'mr-2', "text text_type_main-medium text_color_inactive")} activeClassName={styles.link_active} >
          <span className={cn('ml-2')}>История заказов</span>
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/" className={cn(styles.link, 'pt-4', 'pb-4', 'pr-5', 'mr-2', "text text_type_main-medium text_color_inactive")} activeClassName={styles.link_active} >
          <span className={cn('ml-2')}>Выход</span>
        </NavLink>
      </li>
    </ul>
    <span className={cn("text text_type_main-default text_color_inactive")}>В этом разделе вы можете изменить свои персональные данные</span>
  </div>)
}

export default memo(NewProfile);