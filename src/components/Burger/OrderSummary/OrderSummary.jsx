import React from 'react'

import { Aux } from '../../../hoc/Aux/Aux'
import { Button } from '../../UI/Button/Button'

export const OrderSummary = ({ingredients, clickedCancel, clickedNext, totalPrice}) => {
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
            <p><strong>Total price: {totalPrice.toFixed(2)}$</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType={'Danger'} clicked={clickedCancel}>
                Cancel
            </Button>
            <Button btnType={'Success'} clicked={clickedNext}>
                Continue
            </Button>
        </Aux>
    )
}
