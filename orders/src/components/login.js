import React, { Component } from 'react'
import '../App.css'
import { connect } from "react-redux"
import { onLogin } from "../dispatcher/actions"
import { Redirect } from 'react-router'

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: 'userdemo',
            password: 'password'
        }

    }

    onLoginClicked() {

        this.setState({
            username: this.state.username,
            password: this.state.password
        })

        let credentials = {
            username: this.state.username,
            password: this.state.password
        }

        onLogin(credentials, this.props.dispatch)

    }

    changeInputs = e => { this.setState({ [e.target.name]: e.target.value }) }

    render() {
        if (this.props.userId) {
            console.log(this.props.userId.username)

            return <Redirect to='/catalog' />;
        }
        else {
            var a = this.props.userId

            console.log(a)
            return (

                <div>
                    <h1 className="login">Login</h1>

                    <div className="form-group">
                        <input name="username"
                            className=""
                            type="text"
                            value={this.state.username}
                            placeholder="Email" onChange={this.changeInputs.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input name="password"
                            className=""
                            type="password"
                            vlaue={this.state.password}
                            placeholder="Password" onChange={this.changeInputs.bind(this)} />
                    </div>
                    <p>
                        <button onClick={this.onLoginClicked.bind(this)} className="btn btn-default">Login</button>
                    </p>
                    <h3>{this.props.processing ? "Logging in..." : ""}</h3>
                    <h3>{this.props.loginerror ? "Incorrect User Name or Password!" : ""}</h3>
                </div>
            )
        }

    }
}

export default connect(
    store => ({
        userId: store.userId,
        processing: store.APICallInProgress,
        loginerror: store.APICallFailed
    })
)(Login);