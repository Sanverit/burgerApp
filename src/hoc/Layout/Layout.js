import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Aux } from '../Aux/Aux'
import { Toolbar } from '../../components/Navigation/Toolbar/Toolbar'
import { SideDrawer } from '../../components/Navigation/SideDrawer/SideDrawer'
import classes from './Layout.module.css'

class Layout extends Component {

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
                <Toolbar drawerToggleClicked={this.openSideMunu} isAuth={this.props.isAuthenticated}/>
                <SideDrawer onClickBackDrop={this.closeSideMunu} isMenuOpened={this.state.sideMenuOpened} isAuth={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)