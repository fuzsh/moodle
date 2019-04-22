import React, { Component } from 'react';
import axios from 'axios'

import LoadingDots from '../LoadingDots'

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            coursesList: [],
            courses: [],
            courseList: {},
            username: '',
            password: '',
            loaded: false
        };
    }

    async componentDidMount() {
        const response = await axios.get("http://localhost:5000/api/user", { headers: { "x-auth-token": localStorage.getItem('x-auth-token') } });
        const coursesList = response.data;
        let courses = [];
        this.setState({ coursesList: coursesList });

        const { username, password } = coursesList.splice(-1, 1)[0];
        this.setState({ password, username })
        const filtered = coursesList.map(({ category }) => category);
        const uniq_filtered = filtered.filter(function (item, pos) {
            return filtered.indexOf(item) === pos;
        });

        const getCourses = category => {
            return coursesList.filter(course => course.category === category);
        };

        for (let i = 0; i < uniq_filtered.length; i++) {
            courses.push(getCourses(uniq_filtered[i]));
        }
        this.setState({ courses: courses, loaded: true });
    }
    logOutHandler(e) {
        e.preventDefault();
        localStorage.clear('x-auth-token');
        localStorage.clear('isUserLoggedIn');
        window.location.reload();
    }

    handleClick(e, id, userName, pass) {
        e.preventDefault();
        window
            .open(
                `http://lms.farzadshami.ir/reactlogin.php/?id=${id}&username=${userName}&password=${pass}`,
                "_blank"
            )
            .focus();
    }
    content() {
        return (
            <div className="row">
                {this.state.courses.map(element => (
                    <div className="col-1-of-4" >
                        <div className="card">
                            <div className="card__side">
                                <div className="card__picture card__picture--2">&nbsp;</div>
                                <h4 className="card__heading" style={{ direction: "rtl", fontSize: "18px" }}>
                                    <span className="card__heading-span card__heading-span--2" >
                                        لیست دروس
                                    </span>
                                </h4>
                                <div className="card__details">
                                    <ul style={{ direction: "rtl", marginTop: "5px", fontSize: "14px" }}>
                                        {element.map((item, idx) => (
                                            <li
                                                key={item.id}
                                                className="btn-text"
                                                onClick={e =>
                                                    this.handleClick(e, item.id, this.state.username, this.state.password)
                                                }
                                            >
                                                {item.displayname}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <button className="btn btn--green" onClick={event => {
                    this.logOutHandler(event);
                }}>خروج از حساب کاربری</button>
            </div>
        )

    }

    render() {
        return (
            <div>
                {this.state.loaded ? this.content() : <LoadingDots />}
            </div>
        )
    }
}

export default Dashboard;