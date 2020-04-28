import React from 'react'

import classes from './DrawerToggle.module.css'

export const DrawerToggle = ({clicked}) => {
    return (
        <div onClick={clicked}>
            Menu
        </div>
    )
}
