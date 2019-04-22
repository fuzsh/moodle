import React, { Component } from 'react';
import { connect } from "react-redux";

import Login from './login';
import Register from './register';
import Dashboard from '../Panel/dashboard'

class Auth extends Component {

    render() {
        const componentToRender = this.props.isUserLoggedIn ? <Dashboard /> : this.props.isLoginPage ? <Login /> : <Register />;
        return (
            <React.Fragment>
                <section className="section-enter">
                    <div className="row">
                        {componentToRender}
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

const mapState = state => {
    return {
        isLoginPage: state.isLoginPage
    };
};

export default connect(mapState, null)(Auth);