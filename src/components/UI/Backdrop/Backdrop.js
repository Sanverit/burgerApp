import React from 'react'

import classes from './Backdrop.module.css'

export const Backdrop = ({show, onClose}) => (
    show ? <div className={classes.Backdrop} onClick={() => onClose()}></div> : null
)