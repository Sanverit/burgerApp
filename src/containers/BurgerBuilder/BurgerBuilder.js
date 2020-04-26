import React, { Component } from 'react'

import { MEAT, CHEESE, BACON, SALAD } from '../../components/Burger/burgerIngredientTypes'
import { Aux } from '../../hoc/Aux'
import { Burger } from '../../components/Burger/Burger'
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls'

const ENGREDIENT_PRICES = {
    [SALAD]: 0.6,
    [BACON]: 1,
    [CHEESE]: 0.7,
    [MEAT]: 1.5,
}

export class BurgerBuilder extends Component {

    state = {
        ingredients: {
            [SALAD]: 0,
            [BACON]: 0,
            [CHEESE]: 0,
            [MEAT]: 0,
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = ENGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount < 1 ? 0 : oldCount  - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDeduction = ENGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice > 0 ? oldPrice - priceDeduction : 0

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
    }

    render(){
        console.log('total', this.state.totalPrice)
        let disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls onAdd={this.addIngredientHandler} onRemove={this.removeIngredientHandler} disabled={disabledInfo} />
            </Aux>
        )
    }
}