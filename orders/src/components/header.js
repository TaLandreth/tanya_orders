import React, { Component } from 'react'
import logo from '../images/logo.png'
import '../App.css'
import Popup from 'react-popup'
import { connect } from "react-redux"
import Cart from './cart'
import Catalog from './catalog'
import Orders from './orders'
import { Link, Route, Router, withRouter } from 'react-router-dom'


class Header extends Component {

    seeCart(e) {
        if (this.props.shoppingCart.length !== 0) {
            let total = 0
            this.props.shoppingCart.map((b) => total += b.quantity * b.productprice)

            Popup.create({
                title: 'Shopping Cart: Total: $' + total.toFixed(2),
                content:
                this.props.shoppingCart.map((b) => <Cart
                    line={b} />),
                buttons: {
                    left: ['cancel'],
                    right: [
                        {
                            text: 'Checkout ->',
                            className: 'success',
                            action: function (popup) { popup.close() }
                        }]}});
        }
        else {
            Popup.create({
                title: null, // or string
                content: <Cart line={"No items"} />,
                buttons: {
                    right: ['ok']
                }
            });
        }
    }

    render() {
        return (
            <header className="App-header">
                <Popup />
                <div className="logo-title"><img src={logo} alt="Logo" /></div>
                <div className="navigation">
                    <ul className="navs">
                        <li>Home</li>
                        <li><Link to="/catalog">Products</Link></li>
                        <li><Link to="/orders">Order History</Link></li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className="accticon">
                    <div className="cart">
                        {this.props.userId ? "Hi, " + this.props.userId.username : "Welcome... "}
                    </div>
                    <div className="cart" onClick={this.seeCart.bind(this)}>
                        CART: {this.props.shoppingCart.length}
                    </div>
                </div>
            </header>
        )}
}
export default withRouter(connect(
    store => ({
        userId: store.userId,        
        shoppingCart: store.shoppingCart,
        productList: store.productList,
    })
)(Header));