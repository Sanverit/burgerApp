import React from 'react'

import { Aux } from '../../../hoc/Aux'
import { Backdrop } from '../Backdrop/Backdrop'
import classes from './Modal.module.css'

export const Modal = ({show, hide, children}) => {
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
