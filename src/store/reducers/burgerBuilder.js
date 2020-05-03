import * as actionTypes from './actions'
import * as ingTypes from '../components/Burger/burgerIngredientTypes'

const ENGREDIENT_PRICES = {
    [ingTypes.SALAD]: 0.6,
    [ingTypes.BACON]: 1,
    [ingTypes.CHEESE]: 0.7,
    [ingTypes.MEAT]: 1.5,
}

const initialState = {
    ingredients: {
        [ingTypes.SALAD]: 0,
        [ingTypes.BACON]: 0,
        [ingTypes.CHEESE]: 0,
        [ingTypes.MEAT]: 0,
    },
    totalPrice: 4,
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
                totalPrice: state.totalPrice + ENGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_ENGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - ENGREDIENT_PRICES[action.ingredientName]
            }
    
        default:
            break;
    }
    return state
}

export default reducer;