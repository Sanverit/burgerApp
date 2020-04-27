import React from 'react'

import classes from './Modal.module.css'

export const Modal = (props) => {
    return (
        <div 
            className={classes.Modal} 
            style={{
                transform: props.show ? 'translate(0)' : 'translate(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    )
}
