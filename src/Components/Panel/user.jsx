import React, { Component } from 'react';

class User extends Component {
    logOutHandler(e) {
        e.preventDefault();
        localStorage.clear('x-auth-token');
        localStorage.clear('isUserLoggedIn');
        window.location.reload();
    }

    courseHandleClick(e, id, userName, pass) {
        e.preventDefault();
        window
            .open(
                `http://lms.farzadshami.ir/reactlogin.php/?id=${id}&username=${userName}&password=${pass}`,
                "_blank"
            )
            .focus();
    }
    render() {
        return (
            <div className="row">
                {this.props.courses.map(element => (
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
                                                    this.courseHandleClick(e, item.id, this.props.username, this.props.password)
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
}

export default User;