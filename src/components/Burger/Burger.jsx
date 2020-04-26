import React from 'react'

import { BREAD_BOTTOM, BREAD_TOP } from './burgerIngredientTypes'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'

export const Burger = ({ingredients}) => {
    let transformedIngredients = Object.keys(ingredients)
        .map(ingrKey => {
            return [...Array(ingredients[ingrKey])]
                .map((_, index) => <BurgerIngredient key={ingrKey+index} type={ingrKey} /> )
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p> Let's start to add ingredients </p>
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={BREAD_TOP} />
           {transformedIngredients}
            <BurgerIngredient type={BREAD_BOTTOM} />
        </div>
    )
}