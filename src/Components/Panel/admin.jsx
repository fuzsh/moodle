import React, { Component } from 'react';
import axios from 'axios'

class AdminPanel extends Component {
    varifyHandelClick(e, userId) {
        e.preventDefault();
        const token = localStorage.getItem('x-auth-token')

        axios.post(`http://localhost:5000/api/admin/${userId}`, null, { headers: { "x-auth-token": token } })
            .then(response => {
                console.log(response.data);
            }).catch(ex => {
                console.log(ex.response.data);
            })
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Id</th>
                                        <th scope="col">FirstName</th>
                                        <th scope="col">LastName</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.usersList.map(
                                        function (user, idx) {
                                            return (
                                                <tr key={idx}>
                                                    <th scope="row">{idx + 1}</th>
                                                    <td>{user._id}</td>
                                                    <td>{user.firstname}</td>
                                                    <td>{user.lastname}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn-outline-success"
                                                            style={{
                                                                backgroundColor: "#4CAF50",
                                                                border: "none",
                                                                color: "white",
                                                                padding: "10px 27px",
                                                                textAlign: "center",
                                                                textDecoration: "none",
                                                                display: " inline-block",
                                                                fontSize: "14px"
                                                            }}
                                                            onClick={e => this.varifyHandelClick(e, user._id)}
                                                        >
                                                            Varify
                            </button>
                                                    </td>
                                                </tr>
                                            );
                                        }.bind(this)
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AdminPanel