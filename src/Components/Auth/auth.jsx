import React, { Component } from 'react';
import { connect } from "react-redux";

import Login from './login';
import Register from './register';

class Auth extends Component {

    render() {
        const componentToRender = this.props.isLoginPage ? <Login /> : <Register />;
        return (
            <React.Fragment>
                <section className="section-login">
                    <div className="row">
                        <div className="login">
                            <div className="login__form">
                                {componentToRender}
                            </div>
                        </div>
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