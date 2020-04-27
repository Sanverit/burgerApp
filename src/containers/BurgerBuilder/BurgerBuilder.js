import React, { Component } from 'react'

import { MEAT, CHEESE, BACON, SALAD } from '../../components/Burger/burgerIngredientTypes'
import { Aux } from '../../hoc/Aux'
import { Burger } from '../../components/Burger/Burger'
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls'
import { Modal } from '../../components/UI/Modal/Modal'
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary'

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    purchaseHandler = () => {
        this.setState({purchasing: !this.state.purchasing})
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingrKey => {
                return ingredients[ingrKey]
            })
            .reduce((sum, el) => { return sum + el }, 0)

        this.setState({ purchasable: sum > 0 })
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

        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount < 1 ? 0 : oldCount - 1
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

        this.updatePurchaseState(updatedIngredients)
    }

    render(){
        let disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} hide={() => this.purchaseHandler()}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    onAdd={this.addIngredientHandler}
                    onRemove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    orderNow={() => this.purchaseHandler()}
                />
            </Aux>
        )
    }
}