import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Aux } from '../../hoc/Aux/Aux'
import { Burger } from '../../components/Burger/Burger'
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls'
import { Modal } from '../../components/UI/Modal/Modal'
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary'
import { Spinner } from '../../components/UI/Spinner/Spinner'
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler'
import { axiosOrderInstance } from '../../axios-order'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {

    state = {        
        purchasing: false,
        loading: false,
        errorGettingIngr: false
    }

    componentDidMount() {
        console.log('this.props', this.props)
        // axiosOrderInstance.get("/ingredients.json")
        //     .then(response => {
        //         console.log('response get ingredients: ', response)
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         console.log('error get ingredients: ', error)
        //         this.setState({errorGettingIngr: true})
        //     })
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

        return sum > 0
    }

    render(){
        let disabledInfo = {
            ...this.props.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary =  null

        let burgerContainer = this.state.errorGettingIngr ? <p>Ingredients can't be loader</p> : <Spinner />
        if(this.props.ingredients) {
            burgerContainer = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        onAdd={this.props.onIngredientAdded}
                        onRemove={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        orderNow={() => this.purchaseHandler()}
                    />
                </Aux>
            )

            orderSummary =  <OrderSummary 
                ingredients={this.props.ingredients}
                clickedCancel={this.purchaseCancelHandler}
                clickedNext={this.purchaseContinueHandler}
                totalPrice={this.props.totalPrice}
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_ENGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_ENGREDIENT, ingredientName: ingName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrderInstance))