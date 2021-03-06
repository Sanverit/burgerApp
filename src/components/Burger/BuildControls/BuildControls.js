import React from 'react'

import { BuildControl } from './BuildControl/BuildControl'
import { controls } from './buildControlsConsts'
import classes from './BuildControls.module.css'

export const BuildControls = ({onAdd, onRemove, disabled, price, purchasable, orderNow, isAuth}) => {
    return (
        <div className={classes.BuildControls}>
            <p> Burder price: <strong>{price.toFixed(2)} </strong>$ </p>
            {
                controls.map( control => (
                    <BuildControl 
                        key={control.label} 
                        label={control.label} 
                        onMore={() => onAdd(control.type)} 
                        onLess={() => onRemove(control.type)} 
                        disabled={disabled[control.type]}
                    />
                ))
            }
            <button disabled={!purchasable} className={classes.OrderButton} onClick={orderNow}>{isAuth ? 'ORDER NOW' : 'SING UP TO ORDER'}</button>
        </div>
    )
}
