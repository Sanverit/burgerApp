import React from 'react'

import classes from './BuildControl.module.css'

export const BuildControl = ({label, onMore, onLess, disabled}) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{label}</div>
            <button disabled={disabled} className={classes.Less} onClick={onLess} >Less</button>
            <button className={classes.More} onClick={onMore} >More</button>
        </div>
    )
}
