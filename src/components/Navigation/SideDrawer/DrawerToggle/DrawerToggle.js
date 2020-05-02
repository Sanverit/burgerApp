import React from 'react'

import classes from './DrawerToggle.module.css'

export const DrawerToggle = ({clicked}) => {
    return (
        <div onClick={() => clicked()} className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
