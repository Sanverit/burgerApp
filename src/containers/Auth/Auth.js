import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Input } from '../../components/UI/Input/Input'
import { Button } from '../../components/UI/Button/Button'
import { Spinner } from '../../components/UI/Spinner/Spinner'
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler'
import { axiosOrderInstance } from '../../axios-order'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false
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

        const updatedControls = {
            ...this.state.controls,
            [element]: {
                ...this.state.controls[element],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[element].validation),
                touched: true
            }
        };
        
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid  && formIsValid
        }
        this.setState({controls: updatedControls, formIsValid});
    }

    submitAuthHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,)
    }

    render() {
        const formElementsArray = []
        for(let formElement in this.state.controls){
            formElementsArray.push({
                id: formElement,
                config: this.state.controls[formElement]
            })
        }
        const form = formElementsArray.map(formEl => (
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
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitAuthHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axiosOrderInstance))