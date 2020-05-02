import React, { Component } from 'react'

import { Order } from '../../components/Order/Order'
import classes from './Orders.module.css'

export default class Orders extends Component {
    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        )
    }
}
