import React from 'react';
import cn from 'classnames';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import NavBar from '../nav-bar/nav-bar';

import styles from './app-header.module.css';

const AppHeader = () => {
    const { pathname } = useLocation()
    return (
      <header className={cn("pl-10", "pr-10", "pt-4", "pb-4", "text", "text_type_main-default", styles.header)}>
          <NavBar>
              <>
                  <div className={cn(styles.menu)}>
                      <NavLink to="/" className={cn(styles.link, "pt-4", "pb-4", "pr-5", "mr-2", (navData) => (navData.isActive ? styles.link_active : "none"))} >
                          <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
                          <span className={cn('ml-2')}>Конструктор</span>
                      </NavLink>
                      <NavLink to="/lenta" className={cn(styles.link, "pt-4", "pb-4", "pr-5", "pl-5", (navData) => (navData.isActive ? styles.link_active : "none"))}>
                          <ListIcon type={pathname === '/lenta' ? "primary" : "secondary"} />
                          <span className={cn("ml-2")}>Лента заказов</span>
                      </NavLink>
                  </div>
                  <NavLink to="/" className={cn(styles.logo, (navData) => (navData.isActive ? styles.link_active : "none"))}>
                      <Logo />
                  </NavLink>
                  <NavLink to="/account" className={cn(styles.link, (navData) => (navData.isActive ? styles.link_active : "none"))}>
                      <ProfileIcon type={pathname === "/account" ? "primary" : "secondary"} />
                      <span className={cn("pt-4", "pb-4", "pl-5")}>Личный кабинет</span>
                  </NavLink>
              </>
          </NavBar>
      </header >
    );
}


export default AppHeader;

