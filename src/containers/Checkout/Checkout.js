import React, { Component } from 'react'

import { MEAT, CHEESE, BACON, SALAD } from '../../components/Burger/burgerIngredientTypes'
import { CheckoutSummary } from '../../components/Order/CheckoutSummary/CheckoutSummary'

export default class Checkout extends Component {
    state = {
        ingredients: {
            [SALAD]: 1,
            [BACON]: 1,
            [CHEESE]: 1,
            [MEAT]: 1,
        },
    }
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} />
            </div>
        )
    }
}
