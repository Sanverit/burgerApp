import axios from 'axios'

export const axiosOrderInstance = axios.create({
    baseURL: "https://burgerbuilder2020.firebaseio.com/"
})