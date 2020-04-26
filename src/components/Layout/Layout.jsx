import React from 'react'

import { Aux } from '../../hoc/Aux'
import classes from './Layout.module.css'

export const Layout = (props) => (
    <Aux>
        <div>Toolbsr, SideDrower, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
)