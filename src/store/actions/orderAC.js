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

export const purchaseBurgerStartAC = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInitAC = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStartAC())
        axiosOrderInstance.post("/orders.json?auth=" + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccessAC(response.data.name, orderData ))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailAC(error))
            })
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axiosOrderInstance.get("/orders.json?auth=" + token)
            .then(response => {
                const fetchedOrders = []

                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error))
            })
    }
}