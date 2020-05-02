import React, { Component } from 'react'

import { MEAT, CHEESE, BACON, SALAD } from '../../components/Burger/burgerIngredientTypes'
import { CheckoutSummary } from '../../components/Order/CheckoutSummary/CheckoutSummary'

export default class Checkout extends Component {
    state = {
        ingredients: {
            [SALAD]: 0,
            [BACON]: 0,
            [CHEESE]: 0,
            [MEAT]: 0,
        },
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        console.log('query', query)
        const ingredients = {}
        for(let param of query.entries() ){
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients})

    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={() => this.checkoutCancelledHandler()}
                    checkoutContinued={() => this.checkoutContinuedHandler()}
                />
            </div>
        )
    }
}
