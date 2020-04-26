import React, { Component } from 'react'

import { MEAT, CHEESE, BACON, SALAD } from '../../components/Burger/burgerIngredientTypes'
import { Aux } from '../../hoc/Aux'
import { Burger } from '../../components/Burger/Burger'

export class BurgerBuilder extends Component {

    state = {
        ingredients: {
            [SALAD]: 1,
            [BACON]: 1,
            [CHEESE]: 1,
            [MEAT]: 2,
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