import React from 'react'

import { Aux } from '../../hoc/Aux'
import { Toolbar } from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'

export const Layout = (props) => (
    <Aux>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
)