import React, { Component } from 'react';
import { connect } from 'react-redux';
import { applicationInit } from '../Store/actions'
import Auth from './Auth/auth'
import Dashboard from './Panel/dashboard'
import '../Css/style.css'

class Application extends Component {
    componentDidMount() {
        this.props.init();
    }
    render() {
        const componentToRender = this.props.isUserLoggedIn ? <Dashboard /> : <Auth />;
        return (
            componentToRender
        );
    }
}

const mapState = state => {
    return {
        isUserLoggedIn: state.isUserLoggedIn
    }
};
const mapDispatch = dispatch => {
    return {
        init: () => dispatch(applicationInit())
    }
}

export default connect(mapState, mapDispatch)(Application);