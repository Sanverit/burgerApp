import React, { Component } from 'react'

import { Button } from '../../../components/UI/Button/Button'
import { Spinner } from '../../../components/UI/Spinner/Spinner'
import { Input } from '../../../components/UI/Input/Input'
import { axiosOrderInstance } from '../../../axios-order'
import classes from './ContactData.module.css'

export class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your street'
                },
                value: ''
            },
            building: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your building'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your zipcode'
                },
                value: ''
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your city'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: ''
            },
        },
        loading: false
    }

    sendOrderHandler = (event) => {
        event.preventDefault();

        const {ingredients, totalPrice} = this.props
        
        this.setState({loading: true})

        const formData ={}

        for(let formEl in this.state.orderForm){
            formData[formEl] = this.state.orderForm[formEl].value
        }
       
        const order = {
            ingredients,
            totalPrice,
            orderData: formData
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

    inputChangedHandler = (event, element) => {
        console.log('changed', event.target.value, element)
        this.setState({
            ...this.state,
            orderForm: {
                ...this.state.orderForm,
                [element]: {
                    ...this.state.orderForm[element],
                    value: event.target.value
                } 
            }
        })
    }

    render() {
        const formElementsArray = []
        for(let formElement in this.state.orderForm){
            formElementsArray.push({
                id: formElement,
                config: this.state.orderForm[formElement]
            })
        }
        const inputElements = formElementsArray.map(formEl => (
            <Input 
                key={formEl.id} 
                elementType={formEl.config.elementType} 
                elementConfig={formEl.config.elementConfig} 
                value={formEl.config.value}
                changed={(event) => this.inputChangedHandler(event, formEl.id)}
            />
        ))
        let form = (
            <form onSubmit={this.sendOrderHandler}>
                {inputElements}
                <Button btnType="Success" >ORDER</Button>
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
