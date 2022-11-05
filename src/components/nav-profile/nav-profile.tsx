import React, { memo } from 'react';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { logout } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';
import styles from './nav-profile.module.css';

const NewProfile = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(logout());
  };

  return (
    <div className={cn(styles.nav)}>
      <ul className={cn(styles['list-nav'], 'mb-20')}>
        <li>
          <NavLink
            exact
            to='/profile'
            className={cn(
              styles.link,
              'pt-4',
              'pb-4',
              'pr-5',
              'mr-2',
              'text text_type_main-medium text_color_inactive'
            )}
            activeClassName={styles.link_active}
          >
            <span className={cn('ml-2')}>Профиль</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to='/profile/orders'
            className={cn(
              styles.link,
              'pt-4',
              'pb-4',
              'pr-5',
              'mr-2',
              'text text_type_main-medium text_color_inactive'
            )}
            activeClassName={styles.link_active}
          >
            <span className={cn('ml-2')}>История заказов</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to='/login'
            className={cn(
              styles.link,
              'pt-4',
              'pb-4',
              'pr-5',
              'mr-2',
              'text text_type_main-medium text_color_inactive'
            )}
            activeClassName={styles.link_active}
          >
            <span className={cn('ml-2')} onClick={clickHandler}>
              Выход
            </span>
          </NavLink>
        </li>
      </ul>
      {pathname === '/profile' ? (
        <span className={cn('text text_type_main-default text_color_inactive')}>
          В этом разделе вы можете изменить свои персональные данные
        </span>
      ) : null}
    </div>
  )}

export default memo(NewProfile);