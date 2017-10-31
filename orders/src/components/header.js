import React, { Component } from 'react'
import '../App.css'
import Popup from 'react-popup'
import { connect } from "react-redux"
import { goToCart, modalOpen, modalClose } from "../dispatcher/actions"
import Cart from './cart'
import { Link, withRouter } from 'react-router-dom'
import ReactModal from 'react-modal'

class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false
        }

        this.readyToCheckout = this.readyToCheckout.bind(this)

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);


    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    seeCart(e) {


    }

    readyToCheckout() {
        //goToCart(this.props.dispatch)        
    }

    render() {

        console.log("Modal state:" + this.state.modalIsOpen)

        return (
            <header className="header-container">
                <div className="logo-title">BEST METAL LLC</div>
                <div className="navigation">
                    <ul className="navs">
                        <li>HOME</li>
                        <li>PRODUCTS</li>
                        <li>ORDERS</li>
                        <li>CONTACT</li>
                    </ul>
                </div>
                <div className="accticon">
                    <button className="cart" onClick={this.handleOpenModal}>
                        <span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;{this.props.shoppingCart.length}</button>
                </div>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Shopping Cart"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    {this.props.shoppingCart ? this.props.shoppingCart.map((b) => <Cart line={b} />) : "No Items"}
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </ReactModal>
            </header >
        )
    }
}
export default withRouter(connect(
    store => ({
        shoppingCart: store.shoppingCart,
        clearPopup: store.clearPopup
    })
)(Header));

//