import React from 'react'

import classes from './Navigation.module.css'

export const NavigationItem = ({children, link, active}) => {
    return (
        <li className={classes.NavigationItem}>
            <a href={link}
                className={ active ? classes.active : null}
            >
                {children}
            </a>
        </li>
    )
}
