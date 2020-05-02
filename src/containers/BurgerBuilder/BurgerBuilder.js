import React, { Component } from 'react'

import { MEAT, CHEESE, BACON, SALAD } from '../../components/Burger/burgerIngredientTypes'
import { Aux } from '../../hoc/Aux/Aux'
import { Burger } from '../../components/Burger/Burger'
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls'
import { Modal } from '../../components/UI/Modal/Modal'
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary'
import { Spinner } from '../../components/UI/Spinner/Spinner'
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler'
import { axiosOrderInstance } from '../../axios-order'

const ENGREDIENT_PRICES = {
    [SALAD]: 0.6,
    [BACON]: 1,
    [CHEESE]: 0.7,
    [MEAT]: 1.5,
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        errorGettingIngr: false
    }

    componentDidMount() {
        console.log('this.props', this.props)
        axiosOrderInstance.get("/ingredients.json")
            .then(response => {
                console.log('response get ingredients: ', response)
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                console.log('error get ingredients: ', error)
                this.setState({errorGettingIngr: true})
            })
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        const queryParams = []
        for(let i in this.state.ingredients) {
            queryParams.push( encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]) )
        }
        queryParams.push('totalPrice=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: 'checkout',
            search: '?' + queryString
        })
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

        let orderSummary =  null

        let burgerContainer = this.state.errorGettingIngr ? <p>Ingredients can't be loader</p> : <Spinner />
        if(this.state.ingredients) {
            burgerContainer = (
                <Aux>
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

            orderSummary =  <OrderSummary 
                ingredients={this.state.ingredients}
                clickedCancel={this.purchaseCancelHandler}
                clickedNext={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}
            />
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} hide={() => this.purchaseCancelHandler()}>
                   { orderSummary }
                </Modal>
                { burgerContainer }
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axiosOrderInstance)