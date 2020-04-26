import React from 'react'

import classes from './BuildControl.module.css'

export const BuildControl = ({label}) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{label}</div>
            <button className={classes.Less}>Less</button>
            <button className={classes.More}>More</button>
        </div>
    )
}
