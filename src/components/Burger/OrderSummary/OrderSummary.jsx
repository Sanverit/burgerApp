import React from 'react'

import { Aux } from '../../../hoc/Aux'

export const OrderSummary = ({ingredients}) => {
    const ingredientSummary = Object.keys(ingredients)
        .map( ingrKey => {
            return (
                <li key={ingrKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingrKey}</span>: {ingredients[ingrKey]} 
                </li>
            )
        })
        
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A burger with ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <button>Cancel</button>
            <button>Continue</button>
        </Aux>
    )
}
