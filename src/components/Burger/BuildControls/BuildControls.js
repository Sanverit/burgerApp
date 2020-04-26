import React from 'react'

import { BuildControl } from './BuildControl/BuildControl'
import { controls } from './buildControlsConsts'
import classes from './BuildControls.module.css'

export const BuildControls = () => {
    return (
        <div className={classes.BuildControls}>
            {controls.map( control => <BuildControl key={control.label} label={control.label} /> )}
        </div>
    )
}
