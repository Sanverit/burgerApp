import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Order } from '../../components/Order/Order'
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler'
import { Spinner } from '../../components/UI/Spinner/Spinner'
import { axiosOrderInstance } from '../../axios-order'
import * as actions from '../../store/actions/index'

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token)
    }
    render() {
        let content = this.props.loading ? <Spinner /> : (
            <div>
                {this.props.orders.map(order => (
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        totalPrice={+order.totalPrice}
                    />
                ))}
            </div>
        )
        return content
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosOrderInstance))
