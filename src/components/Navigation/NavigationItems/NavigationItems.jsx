import React from 'react'

import { NavigationItem } from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

export const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact > Burger builder </NavigationItem>
            <NavigationItem link='/orders' > My orders </NavigationItem>
            <NavigationItem link='/auth' > Auth </NavigationItem>
        </ul>
    )
}
