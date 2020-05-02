import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './Navigation.module.css'

export const NavigationItem = ({children, link, exact}) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink to={link} activeClassName={classes.active} exact={exact}>
                {children}
            </NavLink>
        </li>
    )
}
