import React from 'react'

import { NavigationItem } from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

export const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' active > Burger builder </NavigationItem>
            <NavigationItem link='/orders' > My orders </NavigationItem>
            <NavigationItem link='/' > Checkout </NavigationItem>
        </ul>
    )
}
