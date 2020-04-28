import React from 'react'

import BurgerLogo from '../../assets/images/burgerLogo.png'
import classes from './Logo.module.css'

export const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={BurgerLogo} alt="burger logo"/>
        </div>
    )
}
