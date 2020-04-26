import React, { Component } from 'react'

import { MEAT, CHEESE, BACON, SALAD } from '../../components/Burger/burgerIngredientTypes'
import { Aux } from '../../hoc/Aux'
import { Burger } from '../../components/Burger/Burger'

export class BurgerBuilder extends Component {

    state = {
        ingredients: {
            [SALAD]: 0,
            [BACON]: 0,
            [CHEESE]: 0,
            [MEAT]: 0,
        }
    }

    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <div>
                    Burger Controll!
                </div>
            </Aux>
        )
    }
}