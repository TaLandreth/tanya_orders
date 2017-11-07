import React, { Component } from 'react'
import '../App.css'
import { connect } from "react-redux"
import ReactModal from 'react-modal'
import Cart from './cart'
import LineItem from '../models/lineitem'
import OrderModel from '../models/ordermodel'
import Login from './login'
import { completeOrder, clearCart } from "../dispatcher/actions"
import MediaQuery from 'react-responsive'

class Header extends Component {
    constructor() {
        super();
        this.state = {
            userid: null,
            username: '',
            shipping: 3,
            modalIsOpen: false,
            checkingout: false,
            confirmation: false,
            open: false,
            showModalResponsive: false
        }

        this.readyToCheckout = this.readyToCheckout.bind(this)
        this.placeOrder = this.placeOrder.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleOpenModalResponsive = this.handleOpenModalResponsive.bind(this);
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

    handleOpenModalResponsive() {
        this.setState({ showModalResponsive: true });
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            confirmation: false,
            checkingout: false,
            showModalResponsive: false
        });
    }

    burgerToggle() {
        let linksEl = document.querySelector('.navs-narrow')
        if (linksEl.style.display === 'block') {
            linksEl.style.display = 'none';
        } else {
            linksEl.style.display = 'block';
        }
    }

    accountToggle() {
        let linkz = document.querySelector('.user-menu-sub')
        if (linkz.style.display === 'block') {
            linkz.style.display = 'none';
        } else {
            linkz.style.display = 'block';
        }
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
                this.props.shoppingCart[i].quantity))
        }
        var newOrder =
            new OrderModel(
                this.props.userId.id,
                this.state.shipping,
                lines,
                0,
                dateString)

        completeOrder(this.props.dispatch, newOrder)
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
        //TITLE + LINKS + LOGIN + CART
        return (
            <header className="header-container">
                <div className="logo-title" onClick={this.props.displayCatalog}>BEST METAL LLC</div>

                <div className="navigation">
                    {this.state.username !== '' ?
                        <nav>
                            {/* MENU - RESPONSIVE - logged in */}
                            <MediaQuery query="(max-device-width: 600px)">
                                <div className="nav-narrow-container" onClick={this.burgerToggle}>
                                    MENU
                                    <div className="navs-narrow">
                                        <ul className="navs">
                                            <li onClick={this.props.displayCatalog}>CATALOG</li>
                                            <li onClick={this.props.displayOrders}>ORDERS</li>
                                            <li onClick={this.onLogout.bind(this)}>LOGOUT</li>
                                        </ul>
                                    </div>
                                </div>
                            </MediaQuery>
                            {/* MENU - STANDARD - LOGGED IN */}
                            <MediaQuery query="(min-device-width: 600px)">
                                <ul className="navs">
                                    <li onClick={this.props.displayCatalog}>PRODUCT CATALOG</li>
                                    <li onClick={this.props.displayOrders}>ORDERS</li>
                                </ul>
                            </MediaQuery>
                        </nav>
                        :
                        <nav>
                            {/* MENU -RESPONSIVE - NOT LOGGED IN */}
                            <MediaQuery query="(max-device-width: 600px)">
                                <div className="nav-narrow-container" onClick={this.burgerToggle}>
                                    MENU
                                    <div className="navs-narrow">
                                        <ul className="navs">
                                            <li onClick={this.props.displayCatalog}>CATALOG</li>
                                        </ul>
                                    </div>
                                </div>
                            </MediaQuery>
                            {/* MENU - STANDARD - NOT LOGGED IN */}
                            <MediaQuery query="(min-device-width: 600px)">
                                <div className="nav-wide-container">
                                    <div className="navs-wide">
                                        <ul className="navs">
                                            <li onClick={this.props.displayCatalog}>PRODUCT CATALOG</li>
                                        </ul>
                                    </div>
                                </div>
                            </MediaQuery>
                        </nav>
                    }

                </div>
                <div className="accticon">
                    {/* USER MENU & CART ICON - STANDARD - LOGGED IN */}
                    {this.state.username !== '' ?
                        <div className="account-icon-container">
                            <MediaQuery query="(min-device-width: 600px)">
                                <div className="logged-in-menu" onClick={this.accountToggle}>
                                    <div className="user-menu">
                                        <span className="glyphicon glyphicon-user"></span>
                                        &nbsp;Hi, {this.props.userId.username}!&nbsp;&nbsp;
                                    <div className="user-menu-sub">
                                            <div className="logout" onClick={this.onLogout.bind(this)}>Logout</div>
                                        </div>

                                    </div>
                                    <button className="cart" onClick={this.handleOpenModal}>
                                        <span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;
                            {this.props.shoppingCart.length}</button>
                                </div>


                            </MediaQuery>
                            {/* USER MENU & CART ICON - RESPONSIVE - LOGGED IN  */}
                            <MediaQuery query="(max-device-width: 600px)">
                                <button className="cart" onClick={this.handleOpenModalResponsive}>
                                    <span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;
                            {this.props.shoppingCart.length}</button>
                            </MediaQuery>
                        </div>
                        :
                        <div>
                            {/* LOGIN - STANDARD - NOT LOGGED IN */}
                            <MediaQuery query="(min-device-width: 600px)">
                                <button className="cart" onClick={this.handleOpenModal}>
                                    <span className="glyphicon glyphicon-user"></span>&nbsp;Login&nbsp;&nbsp;
                                <span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;{this.props.shoppingCart.length}</button>

                            </MediaQuery>
                            {/* LOGIN - RESPONSIVE - NOT LOGGED IN */}
                            <MediaQuery query="(max-device-width: 600px)">
                                <button className="cart" onClick={this.handleOpenModalResponsive}>
                                    <span className="glyphicon glyphicon-user"></span>&nbsp;Login&nbsp;&nbsp;
                                <span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;{this.props.shoppingCart.length}</button>

                            </MediaQuery>
                        </div>
                    }

                </div>

                {/* STANDARD VIEW - check if logged in, view cart details. If order placed, confirmation : otherwise checkout*/}
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Shopping Cart"
                    className="modal-content"
                    overlayClassName="modal-overlay">

                    {this.state.username !== '' ?
                        <div className="cart-content">
                            <div className="cart-header">Your Cart:</div>

                            {this.props.shoppingCart ? this.props.shoppingCart.map((b) => <Cart line={b} />)
                                :
                                <div className="cart">No Items</div>}
                            <div className="cart-total">Total: ${total.toFixed(2)}</div>

                            {this.state.confirmation ?
                                <div className="order-confirmation">
                                    <h3>Your order has been placed! Check your Orders for status.</h3><br />
                                    <button className="close-popup" onClick={this.handleCheckoutClose}>OK</button>
                                </div>
                                :
                                /* CHECK OUT DETAILS */
                                <div className="checkout-container">
                                    {!this.state.checkingout ?
                                        <div>
                                            <button className="close-popup" onClick={this.handleCloseModal}>Keep Shopping</button>
                                            {total > 0 ? <button className="checkout" onClick={this.readyToCheckout}>CHECKOUT</button> : ""}
                                        </div>
                                        :
                                        <div className="place-order-column">
                                            {total > 0 ?
                                                <div className="cart-div-column">
                                                    <div>
                                                        <button className="close-popup" onClick={this.handleCloseModal}>Keep Shopping</button>
                                                    </div>
                                                    <div className="cart-div-checkout">
                                                        <h4>Continue checkout:</h4>
                                                        <div className="cart-div-checkout">
                                                            Your info: <br />
                                                            <input type="text" className="address" name="Name" value="John Smith" disabled /><br />
                                                            <input type="text" className="address" name="Address" value="123 South Second St" disabled /><br />
                                                            <input type="text" className="city" name="City" value="Columbus" disabled />
                                                            <input type="text" className="state" name="State" value="OH" disabled />
                                                            <input type="text" className="zip" name="Zip" value="45454" disabled />
                                                        </div>
                                                        <div className="cart-div-checkout">
                                                            Select:<br />
                                                            <select><option>Shipping:</option>
                                                                <option name="shipping" value="1">UPS Overnight</option>
                                                                <option name="shipping" value="2">FedEx 2nd Day</option>
                                                                <option name="shipping" value="3">USPS Ground</option></select>
                                                        </div>
                                                        <div className="cart-div-checkout">
                                                            <button className="place-order" onClick={this.placeOrder}>PLACE ORDER</button></div>
                                                    </div>
                                                </div>
                                                :
                                                <button className="close-popup" onClick={this.handleCloseModal}>Keep Shopping</button>
                                            }
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                        :
                        <div className="login">
                            <Login loggedIn={this.onLogin} />
                        </div>
                    }

                </ReactModal>

                {/* RESPONSIVE CART POP UP: */}
                <MediaQuery query="(max-device-width: 600px)">
                    <ReactModal
                        isOpen={this.state.showModalResponsive}
                        contentLabel="Shopping Cart"
                        className="modal-content-responsive"
                        overlayClassName="modal-overlay">

                        {this.state.username !== '' ?
                            <div className="cart-content">
                                <div className="cart-header">Your Cart:</div>

                                {this.props.shoppingCart ? this.props.shoppingCart.map((b) => <Cart line={b} />)
                                    :
                                    <div className="cart">No Items</div>}
                                <div className="cart-total">Total: ${total.toFixed(2)}</div>

                                {this.state.confirmation ?
                                    <div className="order-confirmation">
                                        <h3>Your order has been placed! Check your Orders for status.</h3><br />
                                        <button className="close-popup" onClick={this.handleCheckoutClose}>OK</button>
                                    </div>
                                    :

                                    <div className="checkout-container">
                                        {!this.state.checkingout ?
                                            <div>
                                                <button className="close-popup" onClick={this.handleCloseModal}>Keep Shopping</button>
                                                {total > 0 ? <button className="checkout" onClick={this.readyToCheckout}>CHECKOUT</button> : ""}
                                            </div>
                                            :

                                            <div className="place-order-column">

                                                {total > 0 ?
                                                    <div className="cart-div-column">
                                                        <div>
                                                            <button className="close-popup" onClick={this.handleCloseModal}>Keep Shopping</button>
                                                        </div>
                                                        <div className="cart-div-checkout">
                                                            <h4>Continue checkout:</h4>
                                                            <div className="cart-div-checkout">
                                                                Your info: <br />
                                                                <input type="text" className="address" name="Name" value="John Smith" disabled /><br />
                                                                <input type="text" className="address" name="Address" value="123 South Second St" disabled /><br />
                                                                <input type="text" className="city" name="City" value="Columbus" disabled />
                                                                <input type="text" className="state" name="State" value="OH" disabled />
                                                                <input type="text" className="zip" name="Zip" value="45454" disabled />
                                                            </div>
                                                            <div className="cart-div-checkout">
                                                                Select:&nbsp;
                                                                <select><option>Shipping:</option>
                                                                    <option name="shipping" value="1">UPS Overnight</option>
                                                                    <option name="shipping" value="2">FedEx 2nd Day</option>
                                                                    <option name="shipping" value="3">USPS Ground</option></select>
                                                            </div>
                                                            <div className="cart-div-checkout">
                                                                <button className="place-order" onClick={this.placeOrder}>PLACE ORDER</button></div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <button className="close-popup" onClick={this.handleCloseModal}>Keep Shopping</button>
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                            :
                            <div className="login">
                                <Login loggedIn={this.onLogin} />
                            </div>
                        }
                    </ReactModal>
                </MediaQuery>

            </header >
        )//end return
    }//end render
}//end component
export default connect(
    store => ({
        shoppingCart: store.shoppingCart,
        userId: store.userId,
    })
)(Header);