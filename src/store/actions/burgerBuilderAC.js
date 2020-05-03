import { axiosOrderInstance } from '../../axios-order'
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

export const setIngredientAC = (ings) => {
    return {
        type: actionTypes.SET_INGREDIENTS, ingredients: ings
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axiosOrderInstance.get("/ingredients.json")
        .then(response => {
            dispatch(setIngredientAC(response.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed())
        })
    }
}