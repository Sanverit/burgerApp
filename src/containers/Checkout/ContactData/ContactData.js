import React, { Component } from 'react'

import { Button } from '../../../components/UI/Button/Button'
import { Spinner } from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import { axiosOrderInstance } from '../../../axios-order'

export class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            building: '',
            zipCode: '',
            city: ''
        },
        loading: false
    }

    sendOrderHandler = (event) => {
        event.preventDefault();

        const {ingredients, totalPrice} = this.props
        
        this.setState({loading: true})
       
        const order = {
            ingredients,
            totalPrice,
            customer: {
                name: 'Alex',
                address: {
                    street: 'vicolo Anselmi',
                    building: '3',
                    zipCode: '27029',
                    city: 'Vigevano'
                },
                email: "ndt@gmail.com"
            },
            deliveryMethod: 'fastest'
        }

        axiosOrderInstance.post("/orders.json", order)
            .then(response => {
                console.log('response send order: ', response)
                this.setState({loading: false})
                this.props.history.push('/')
            })
            .catch(error => {
                console.log('error send order: ', error)
                this.setState({loading: false})
            })
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='your name' />
                <input className={classes.Input} type='email' name='email' placeholder='your email' />
                <input className={classes.Input} type='text' name='street' placeholder='your street' />
                <input className={classes.Input} type='text' name='building' placeholder='your building' />
                <input className={classes.Input} type='text' name='zipCode' placeholder='your zipCode' />
                <input className={classes.Input} type='text' name='city' placeholder='your city' />
                <Button btnType="Success" clicked={this.sendOrderHandler} >ORDER</Button>
            </form>
        )
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                { form }
            </div>
        )
    }
}
