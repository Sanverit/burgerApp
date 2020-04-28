import React from 'react'

import { Logo } from '../../Logo/Logo'
import { NavigationItems } from '../NavigationItems/NavigationItems'
import classes from './Toolbar.module.css'

export const Toolbar = () => {
    return (
        <header className={classes.Toolbar}>
            <div>Menu</div>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DisplayOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}
