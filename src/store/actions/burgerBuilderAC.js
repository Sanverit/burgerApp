import * as actionTypes from './actionTypes'

export const addIngredientAC = (ingName) => {
    return {
        type: actionTypes.ADD_ENGREDIENT, ingredientName: ingName
    }
}

export const removeIngredientAC = (ingName) => {
    return {
        type: actionTypes.REMOVE_ENGREDIENT, ingredientName: ingName
    }
}