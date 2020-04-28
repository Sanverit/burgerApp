import React from 'react'

import { Logo } from '../../Logo/Logo'
import classes from './Toolbar.module.css'

export const Toolbar = () => {
    return (
        <header className={classes.Toolbar}>
            <div>Menu</div>
            <Logo />
            <nav>
                ...
            </nav>
        </header>
    )
}
