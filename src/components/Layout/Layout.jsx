import React from 'react'

import { Aux } from '../../hoc/Aux'

export const Layout = (props) => (
    <Aux>
        <div>Toolbsr, SideDrower, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Aux>
)