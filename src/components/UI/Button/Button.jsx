import React from 'react'

import classes from './Button.module.css'

export const Button = ({children, clicked, btnType}) => {
    return (
        <button 
            className={[classes.Button, classes[btnType]].join(' ')} 
            onClick={() => clicked()}
        >
            {children}
        </button>
    )
}
