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
import * as actions from '../../store/actions/index'
// import * as orderActions from '../../store/actions/index'

class BurgerBuilder extends Component {

    state = {        
        purchasing: false,
    }

    componentDidMount() {
        console.log('this.props', this.props)
        this.props.onInitIngredients()
    }

    purchaseHandler = () => {
        if(this.props.isAuth){
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
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

        let burgerContainer = this.props.error ? <p>Ingredients can't be loader</p> : <Spinner />
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
                        isAuth={this.props.isAuth}
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
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        purchased: state.order.purchased,
        isAuth: state.auth.token !== null,
        redirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredientAC(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredientAC(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInitAC()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPathAC(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrderInstance))