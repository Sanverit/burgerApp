import React from 'react'

import { BREAD_BOTTOM, BREAD_TOP, MEAT, CHEESE, BACON, SALAD } from './burgerIngredientTypes'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'

export const Burger = () => {
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={BREAD_TOP} />
            <BurgerIngredient type={SALAD} />
            <BurgerIngredient type={BACON} />
            <BurgerIngredient type={CHEESE} />
            <BurgerIngredient type={MEAT} />
            <BurgerIngredient type={BREAD_BOTTOM} />
        </div>
    )
}