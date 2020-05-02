import React from 'react'

import classes from './Order.module.css'

export const Order = ({ingredients, totalPrice}) => {
    const ingrs = []
    for(let ingName in ingredients){
        ingrs.push({
            ingrredient: ingName,
            qty: ingredients[ingName]
        })
    }
    return (
        <div className={classes.Order}>
             <p>Ingredients:</p>
            {ingrs.map(item => (
                item.qty > 0 ? <p key={item.ingrredient}>{item.ingrredient}: {item.qty}</p> : null
            ))}
            
            <p>Price: <strong> USD {totalPrice.toFixed(2)}</strong></p>
        </div>
    )
}
