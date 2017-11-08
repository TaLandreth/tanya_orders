import React, { Component } from 'react'
import '../App.css'
import { connect } from "react-redux"
import { onLogin } from "../dispatcher/actions"

class Login extends Component {
    constructor() {
        super();
        this.state = {
            userid: null,
            username: '',
            password: '',
            error: false,
            loggingin: false
        }
        this.onLogin = this.onLogin.bind(this)
    }

    changeInputs = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onLogin() {

        if (this.state.username === '' || this.state.password === '') {
            this.setState({ error: true })
        }

        else {

            this.setState({ error: false })

            let credentials = {
                username: this.state.username,
                password: this.state.password
            }

            onLogin(credentials, this.props.dispatch)

            this.setState({ loggingin: true })

            setTimeout(() => {
                if (this.props.userId.customerId && this.props.userId.username) {
                    this.props.loggedIn()
                }
            }, 800)
        }
    }

    render() {

        return (
            <div className="login-container">

                <div className="login-tabs-group">
                    <div className="login-tab"><h4>Login</h4></div>
                    <div className="login-tab-register"><h4>Sign Up</h4></div>
                </div>
                <div className="login-tabs-group">
                <div className="login-tab-divider">Already have an account? Login below!</div>
            </div>

                <div className="form">
                    <input name="username"
                        type="text"
                        value={this.state.username}
                        placeholder="Email" onChange={this.changeInputs.bind(this)} />
                </div>
                <div className="form">
                    <input name="password"
                        type="password"
                        value={this.state.password}
                        placeholder="Password" onChange={this.changeInputs.bind(this)} />
                </div>


                <div className="login-btn-container">
                    <button onClick={this.onLogin} className="login-btn">LOGIN</button>
                    <div className="msg">
                        <h3>
                            {this.state.error ? "Please provide your login credentials" : ""}
                            {this.props.APICallFailed ? "Login failed!" : ""}</h3>
                        <h2> {this.state.loggingin ? "Logging In...." : ""}</h2>

                    </div>
                </div>

                <div className="login-tabs-group">
                    <div className="login-tab">&nbsp;</div>
                    <div className="login-tab-right" onClick={this.props.nevermind}>Cancel</div>
                </div>


            </div>
        )
    }
}
export default connect(
    store => ({
        userId: store.userId,
        APICallFailed: store.APICallFailed,
    })
)(Login);