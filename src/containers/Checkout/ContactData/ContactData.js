import React, { Component } from 'react'

import { Button } from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'

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
    }
    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={classes.Input} type='text' name='name' placeholder='your name' />
                    <input className={classes.Input} type='email' name='email' placeholder='your email' />
                    <input className={classes.Input} type='text' name='street' placeholder='your street' />
                    <input className={classes.Input} type='text' name='building' placeholder='your building' />
                    <input className={classes.Input} type='text' name='zipCode' placeholder='your zipCode' />
                    <input className={classes.Input} type='text' name='city' placeholder='your city' />
                    <Button btnType="Success" >ORDER</Button>
                </form>
            </div>
        )
    }
}
