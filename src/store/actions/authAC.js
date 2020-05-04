import * as actionTypes from './actionTypes'

export const authStartAC = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccessAC = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
}

export const authFailAC = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = () => {
    return dispatch => {
        dispatch(authStartAC())
    }
}