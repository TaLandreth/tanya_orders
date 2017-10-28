import React, { Component } from 'react'
import logo from '../images/logo.png'
import '../App.css';

export default class Header extends Component {
    render() {

        return (
        <header className="App-header">
            <div className="logo-title"><img src={logo} alt="Logo"/></div>
            <div className="navigation">
                <ul className="navs">
                    <li>Home</li>
                    <li>Products</li>
                    <li>Company</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className="accticon">
                <div className="cart">
                {this.props.user ? this.props.user.username : "Welcome..."}
                </div>
                <div className="cart">
                CART: {this.props.cart.length}
                </div>
            </div>

        </header>
        
        )
    }


}