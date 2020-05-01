import React, { Component } from 'react'

import { Aux } from '../../../hoc/Aux/Aux'
import { Backdrop } from '../Backdrop/Backdrop'
import classes from './Modal.module.css'

export class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render() {
        const {hide, show, children} = this.props
        return (
            <Aux>
                <Backdrop show={show} onClose={hide}/>
                <div 
                    className={classes.Modal} 
                    style={{
                        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: show ? '1' : '0'
                    }}>
                    {children}
                </div>
            </Aux>
        )
    }
}
