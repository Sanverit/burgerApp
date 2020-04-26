import React from 'react'

import { BREAD_BOTTOM, BREAD_TOP } from './burgerIngredientTypes'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'

export const Burger = ({ingredients}) => {
    const transformedIngredients = Object.keys(ingredients).map(ingrKey => {
        return [...Array(ingredients[ingrKey])].map((_, index) => <BurgerIngredient key={ingrKey+index} type={ingrKey} /> )
    } )
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={BREAD_TOP} />
           {transformedIngredients}
            <BurgerIngredient type={BREAD_BOTTOM} />
        </div>
    )
}