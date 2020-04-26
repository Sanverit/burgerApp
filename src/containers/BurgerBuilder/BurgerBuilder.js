import React, { Component } from 'react'

import { Aux } from '../../hoc/Aux'
import { Burger } from '../../components/Burger/Burger'

export class BurgerBuilder extends Component {
    render(){
        return(
            <Aux>
                <Burger />
                <div>
                    Burger Controll!
                </div>
            </Aux>
        )
    }
}