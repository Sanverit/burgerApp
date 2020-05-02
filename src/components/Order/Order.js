import React from 'react'

import classes from './Order.module.css'

export const Order = () => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: Salad (1)</p>
            <p>Price: <strong> USD 5.45</strong></p>
        </div>
    )
}
