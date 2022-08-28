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
                        <NavLink to="/" className={cn(styles.link, "pt-4", "pb-4", "pr-5", "mr-2")}
                                 style={({ isActive }) => ({ color: isActive ? '#F2F2F3' : '#8585AD' })}
                                 >
                            <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
                            <span className={cn("ml-2")}>Конструктор</span>
                        </NavLink>
                        <NavLink to="/lenta" className={cn(styles.link, "pt-4", "pb-4", "pr-5", "pl-5")}
                                 style={({ isActive }) => ({ color: isActive ? '#F2F2F3' : '#8585AD' })}
                        >
                            <ListIcon type={pathname === "/lenta" ? "primary" : "secondary"} />
                            <span className={cn("ml-2")}>Лента заказов</span>
                        </NavLink>
                    </div>
                    <NavLink to="/" className={cn(styles.logo)}
                             style={({ isActive }) => ({ color: isActive ? '#F2F2F3' : '#8585AD' })}
                    >
                        <Logo/>
                    </NavLink>
                    <NavLink to="/account" className={cn(styles.link)}
                             style={({ isActive }) => ({ color: isActive ? '#F2F2F3' : '#8585AD' })}
                    >
                        <ProfileIcon type={pathname === '/account' ? "primary" : "secondary"} />
                        <span className={cn("pt-4", "pb-4", "pl-5")}>Личный кабинет</span>
                    </NavLink>
                </>
            </HeaderItem>
        </header>
    );
}

export default AppHeader
