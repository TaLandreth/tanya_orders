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
            error: false
        }

        this.onLogin = this.onLogin.bind(this)

    }

    changeInputs = e => { this.setState({ [e.target.name]: e.target.value }) }

    onLogin() {

        console.log("On click:" + this.props.userId)       
        
        if (this.state.username === null || this.state.password === null
        || this.state.username === '' || this.state.password === '')
        {
            this.setState({error: true})
        }

        else {
        let credentials = {
            username: this.state.username,
            password: this.state.password
        }

        onLogin(credentials, this.props.dispatch)

        console.log("After sent to dispatcher:" + this.props.userId)
        
        if (this.props.userId !== null && this.props.APICallFailed === false) {
            this.props.loggedIn()
        }

    }
    }



    render() {

        //console.log(this.state.username)

        return (
            <div className="login-container">
                <h1 className="login">Login</h1>
                <div className="form-group">
                    <input name="username"
                        type="text"
                        value={this.state.username}
                        placeholder="Email" onChange={this.changeInputs.bind(this)} />
                </div>
                <div className="form-group">
                    <input name="password"
                        type="password"
                        value={this.state.password}
                        placeholder="Password" onChange={this.changeInputs.bind(this)} />
                </div>

                <div className="login-btn-container">
                    <button onClick={this.onLogin} className="btn btn-default">Login</button>
                    <div className="error-msg">
                    {this.state.error ? "Please provide your login credentials" : ""}</div>
                </div>
            </div>
        )
    }
}
export default connect(
    store => ({
        userId: store.userId,
        APICallFailed: store.APICallFailed
    })
)(Login);