import React, { Component } from 'react'

import { Order } from '../../components/Order/Order'
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler'
import { axiosOrderInstance } from '../../axios-order'
import classes from './Orders.module.css'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axiosOrderInstance.get("/orders.json")
        .then(response => {
            const fetchedOrders = []

            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            console.log('response get fetchedOrders: ', fetchedOrders)
            this.setState({loading: false, orders: fetchedOrders})
        })
        .catch(error => {
            console.log('error get orders: ', error)
            this.setState({loading: false})
        })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        totalPrice={+order.totalPrice}
                    />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axiosOrderInstance)
