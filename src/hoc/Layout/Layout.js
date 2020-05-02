import React, { Component } from 'react'

import { Aux } from '../Aux/Aux'
import { Toolbar } from '../../components/Navigation/Toolbar/Toolbar'
import { SideDrawer } from '../../components/Navigation/SideDrawer/SideDrawer'
import classes from './Layout.module.css'

export class Layout extends Component {

    state = {
        sideMenuOpened: false
    }

    openSideMunu = () => {
        this.setState({sideMenuOpened: true})
    }

    closeSideMunu = () => {
        this.setState({sideMenuOpened: false})
    }

    render(){
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.openSideMunu}/>
                <SideDrawer onClickBackDrop={this.closeSideMunu} isMenuOpened={this.state.sideMenuOpened} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}