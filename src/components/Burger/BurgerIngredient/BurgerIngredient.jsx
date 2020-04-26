import React from 'react'

import { BREAD_BOTTOM, BREAD_TOP, MEAT, CHEESE, BACON, SALAD } from '../burgerIngredientTypes'
import classes from './BurgerIngredient.module.css'

export const BurgerIngredient = (props) => {
    let ingredient = null;
    switch (props.type) {
        case BREAD_BOTTOM:
            ingredient = <div className={classes.BreadBottom}></div>
            break;

        case BREAD_TOP:
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            )
            break;

        case MEAT:
            ingredient = <div className={classes.Meat}></div>
            break;

        case CHEESE:
            ingredient = <div className={classes.Cheese}></div>
            break;

        case BACON:
            ingredient = <div className={classes.Bacon}></div>
            break;

        case SALAD:
            ingredient = <div className={classes.Salad}></div>
            break;
    
        default:
            ingredient = null;
            break;
    }

    return ingredient;
}

