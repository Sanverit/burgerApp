import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button } from '../../../components/UI/Button/Button'
import { Spinner } from '../../../components/UI/Spinner/Spinner'
import { Input } from '../../../components/UI/Input/Input'
import { axiosOrderInstance } from '../../../axios-order'
import classes from './ContactData.module.css'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            building: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your building'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your city'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: '',
                validation: {},
                valid: true,
            },
        },
        formIsValid: false,
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

    checkValidity(value, rules) {
        let isValid = true

        if(!rules){
            return true
        }
        if(rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if(rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if(rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid
    }

    inputChangedHandler = (event, element) => {

        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[element]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[element] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid  && formIsValid
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        console.log('state', this.state)
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
                shouldValidate={formEl.config.validation}
                invalid={!formEl.config.valid}
                touched={formEl.config.touched}
                changed={(event) => this.inputChangedHandler(event, formEl.id)}
            />
        ))
        let form = (
            <form onSubmit={this.sendOrderHandler}>
                {inputElements}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData)