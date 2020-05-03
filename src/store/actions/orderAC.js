import { axiosOrderInstance } from '../../axios-order'
import * as actionTypes from './actionTypes'

export const purchaseBurgerSuccessAC = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData 
    }
}

export const purchaseBurgerFailAC = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axiosOrderInstance.post("/orders.json", orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccessAC(response.data))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailAC(error))
            })
    }
}