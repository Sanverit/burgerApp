import React from 'react'

import { NavigationItem } from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

export const NavigationItems = ({isAuth}) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact > Burger builder </NavigationItem>
            <NavigationItem link='/orders' > My orders </NavigationItem>
            { !isAuth ? <NavigationItem link='/auth' > Authenticate </NavigationItem> : <NavigationItem link='/logout' > Logout </NavigationItem>}
        </ul>
    )
}
