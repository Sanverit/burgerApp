import React from 'react'

import { NavigationItem } from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

export const NavigationItems = ({isAuth}) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact > Burger builder </NavigationItem>
            { isAuth ? <NavigationItem link='/orders' > My orders </NavigationItem> : null }
            { !isAuth ? <NavigationItem link='/auth' > Authenticate </NavigationItem> : <NavigationItem link='/logout' > Logout </NavigationItem>}
        </ul>
    )
}
