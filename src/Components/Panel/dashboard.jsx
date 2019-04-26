import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchCourses } from "../../Store/actions";

import Admin from './admin'
import User from './user'
import LoadingDots from '../LoadingDots'

class Dashboard extends Component {

    async componentDidMount() {
        this.props.fetchCourses();
    }

    render() {
        const componentToRender = this.props.loaded ? this.props.usersList.length > 0 ? <Admin usersList={this.props.usersList} /> : <User courses={this.props.courses} password={this.props.password} username={this.props.username} /> : <LoadingDots />
        return (
            componentToRender
        )
    }
}

const mapState = state => {
    return {
        usersList: state.usersList,
        courses: state.courses,
        username: state.username,
        password: state.password,
        errors: state.errors,
        loaded: state.loaded
    };
};

const mapDispatch = dispatch => {
    return {
        fetchCourses: () => dispatch(fetchCourses()),
    };
};

export default connect(mapState, mapDispatch)(Dashboard);