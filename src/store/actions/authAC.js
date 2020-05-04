import axios from 'axios'
import * as actionTypes from './actionTypes'

const singinUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAqXqrDHwXRnq2IAVk5hUEqcBhUclBvxJw'
const singupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAqXqrDHwXRnq2IAVk5hUEqcBhUclBvxJw'

export const authStartAC = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccessAC = ({idToken, localId}) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId: localId
    }
}

export const authFailAC = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = (email, password, isSingup) => {
    return dispatch => {
        dispatch(authStartAC())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        const url = isSingup ? singupUrl : singinUrl
        axios.post(url, authData)
            .then(response => {
                console.log('authSuccessAC', response)
                dispatch(authSuccessAC(response.data))
            })
            .catch(error => {
                console.log('authFailAC', error)
                dispatch(authFailAC(error.response.data.error))
            })
    }
}