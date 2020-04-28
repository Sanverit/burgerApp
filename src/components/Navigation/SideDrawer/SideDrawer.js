import React from 'react'

import { Logo } from '../../Logo/Logo'
import { NavigationItems } from '../NavigationItems/NavigationItems'
import { Backdrop } from '../../UI/Backdrop/Backdrop'
import { Aux } from '../../../hoc/Aux'
import classes from './SideDrawer.module.css'

export const SideDrawer = ({isMenuOpened, onClickBackDrop}) => {
    return (
        <Aux>
            <Backdrop show={isMenuOpened} onClose={onClickBackDrop} />
            <div className={[classes.SideDrawer, isMenuOpened ? classes.Open : classes.Close ].join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}
