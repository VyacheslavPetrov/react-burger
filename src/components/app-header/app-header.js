import React from "react"
import cn from "classnames"
import {NavLink, useLocation} from 'react-router-dom'
import HeaderItem from "../header-item/header-item"
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./app-header.module.css"

const AppHeader = () => {
    const {pathname} = useLocation()
    return (
        <header className={cn(styles.header, "pl-10", "pr-10", "pt-4", "pb-4", "text", "text_type_main-default")}>
            <HeaderItem>
                <>
                    <div className={cn(styles.menu)}>
                        <NavLink exact to="/" className={cn(styles.link, "pt-4", "pb-4", "pr-5", "mr-2")} activeClassName={styles.link_active}>
                            <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
                            <span className={cn("ml-2")}>Конструктор</span>
                        </NavLink>
                        <NavLink to="/lenta" activeClassName={styles.link_active} className={cn(styles.link, "pt-4", "pb-4", "pr-5", "pl-5")}>
                            <ListIcon type={pathname === "/lenta" ? "primary" : "secondary"} />
                            <span className={cn("ml-2")}>Лента заказов</span>
                        </NavLink>
                    </div>
                    <NavLink exact to="/" activeClassName={styles.link_active} className={cn(styles.logo)}>
                        <Logo/>
                    </NavLink>
                    <NavLink to="/account" activeClassName={styles.link_active} className={cn(styles.link)}>
                        <ProfileIcon type={pathname === '/account' ? "primary" : "secondary"} />
                        <span className={cn("pt-4", "pb-4", "pl-5")}>Личный кабинет</span>
                    </NavLink>
                </>
            </HeaderItem>
        </header>
    );
}

export default AppHeader
