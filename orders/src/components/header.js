import React, { Component } from 'react'
import '../App.css'
import { connect } from "react-redux"
import ReactModal from 'react-modal'
import Cart from './cart'
import LineItem from '../models/lineitem'
import OrderModel from '../models/ordermodel'
import OrderDetails from './orderdetails'
import Login from './login'
import { completeOrder, clearCart } from "../dispatcher/actions"

class Header extends Component {
    constructor() {
        super();
        this.state = {
            userid: null,
            username: '',
            shipping: 3,
            modalIsOpen: false,
            checkingout: false,
            confirmation: false
        }

        this.readyToCheckout = this.readyToCheckout.bind(this)
        this.placeOrder = this.placeOrder.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCheckoutClose = this.handleCheckoutClose.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);

    }

    onLogin(username, password) {
        this.setState({
            username: username
        })
        this.handleCloseModal()

        console.log("User ID:" + this.props.userId.id)
    }

    onLogout() {
        this.setState({
            username: ''
        })

        this.props.displayCatalog()
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            confirmation: false,
            checkingout: false
        });
    }

    handleCheckoutClose() {
        this.setState({
            showModal: false,
            confirmation: false,
            checkingout: false
        });

        //CLEAR CART
        clearCart(this.props.dispatch)


    }

    changeInputs = e => { this.setState({ [e.target.name]: e.target.value }) }

    readyToCheckout() {
        this.setState({
            checkingout: true
        })
    }

    placeOrder() {
        var date = new Date()
        var dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        var lines = []

        for (var i = 0; i < this.props.shoppingCart.length; i++) {
            lines.push(new LineItem(
                this.props.shoppingCart[i].productdetailsid,
                this.props.shoppingCart[i].quantity,
            )
            )
        }
        var newOrder =
            new OrderModel(
                this.props.userId.id,
                this.state.shipping,
                lines,
                0,
                dateString)

        completeOrder(this.props.dispatch, newOrder)

        console.log("Shipping method:" + this.state.shipping)

        //CONFIRM ORDER --
        this.setState({
            confirmation: true
        })

    }

    render() {
        var total = 0

        for (var i = 0; i < this.props.shoppingCart.length; i++) {
            total += (this.props.shoppingCart[i].productprice * this.props.shoppingCart[i].quantity)
        }

        console.log(this.props.lastOrder)

        //TITLE + LINKS - LOGIN & CART


        return (
            <header className="header-container">
                <div className="logo-title">BEST METAL LLC</div>
                <div className="navigation">
                    {this.state.username !== '' ?
                        <ul className="navs">
                            <li onClick={this.props.displayCatalog}>PRODUCT CATALOG</li>
                            <li onClick={this.props.displayOrders}>ORDERS</li>
                            <li className="logout" onClick={this.onLogout.bind(this)}>LOGOUT</li>
                        </ul> :
                        <ul className="navs">
                            <li onClick={this.props.displayCatalog}>PRODUCT CATALOG</li>
                        </ul>}

                </div>
                <div className="accticon">

                    {this.state.username !== '' ?
                        <button className="cart" onClick={this.handleOpenModal}>Hi, {this.props.userId.username}!&nbsp;
                            <span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;{this.props.shoppingCart.length}</button> :

                        <div>
                            <button className="cart" onClick={this.handleOpenModal}>
                                <span className="glyphicon glyphicon-user"></span>&nbsp;Login&nbsp;&nbsp;
                                <span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;{this.props.shoppingCart.length}</button>
                        </div>
                    }

                </div>

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Shopping Cart"
                    className="modal-content"
                    overlayClassName="modal-overlay">


                    {this.state.username !== '' ?
                        <div>
                            <div className="cart-header">Your Cart:</div>

                            {this.props.shoppingCart ? this.props.shoppingCart.map((b) => <Cart line={b} />)

                                :
                                <div className="cart">No Items</div>}



                            <div className="cart-total">Total: ${total.toFixed(2)}</div>


                            {this.state.confirmation ?
                                <div>
                                    Your order has been placed! Check your Orders for status.
                                    <button className="close-popup" onClick={this.handleCheckoutClose}>Ok</button>
                                </div>

                                :

                                <div>
                                    {!this.state.checkingout ?
                                        <div>
                                            <button className="close-popup" onClick={this.handleCloseModal}>Close</button>
                                            {total > 0 ? <button className="checkout" onClick={this.readyToCheckout}>CHECKOUT</button> : ""}
                                        </div>
                                        :
                                        <div className="cart-div-column">
                                            <div className="cart-div-keepshopping">You can&nbsp;<button className="close-popup" onClick={this.handleCloseModal}>Keep Shopping</button> or
                                            <h3>Continue checkout:</h3></div>
                                            <div className="cart-div-checkout">
                                                Select:&nbsp;
                                                <select><option>Shipping Method: --</option>
                                                    <option name="shipping" value="1">UPS Overnight</option>
                                                    <option name="shipping" value="2">FedEx 2nd Day</option>
                                                    <option name="shipping" value="3">USPS Ground</option></select>
                                            </div>
                                            {total > 0 ? <div className="cart-div-checkout"><button className="place-order" onClick={this.placeOrder}>PLACE ORDER</button></div>

                                                : ""}
                                        </div>
                                    }
                                </div>


                            }


                        </div>
                        :
                        <div className="login">
                            <Login loggedIn={this.onLogin} />
                            <h3>{this.props.loginFailed ? "Login failed!" : ""}</h3>
                        </div>
                    }

                </ReactModal>


            </header >
        )//end return
    }//end render
}//end component
export default connect(
    store => ({
        shoppingCart: store.shoppingCart,
        userId: store.userId,
        loginFailed: store.APICallFailed,
        lastOrder: store.lastOrder
    })
)(Header);