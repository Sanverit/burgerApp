import * as actionTypes from '../actions/actionTypes'
import * as ingTypes from '../../components/Burger/burgerIngredientTypes'

const ENGREDIENT_PRICES = {
    [ingTypes.SALAD]: 0.6,
    [ingTypes.BACON]: 1,
    [ingTypes.CHEESE]: 0.7,
    [ingTypes.MEAT]: 1.5,
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ENGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + ENGREDIENT_PRICES[action.ingredientName],
                building: true
            }
        case actionTypes.REMOVE_ENGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - ENGREDIENT_PRICES[action.ingredientName],
                building: true
            }

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 4,
                error: false,
                building: false
            }

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
    
        default:
            return state
    }
    
}

export default reducer;