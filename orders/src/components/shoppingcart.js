import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import LineItem from '../models/lineitem'
import { addToCart } from "../dispatcher/actions"
import Popup from 'react-popup'
import { withRouter } from 'react-router-dom'

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            shoppingCart: this.props.shoppingCart,
            index: this.props.productList.findIndex(i => i.id === this.props.prod.id)
        }
        this.addToCart = this.addToCart.bind(this)
    }


    render() {
            return (
        <div className="product-details-rows">
                    "Shopping cart details"
        </div>
            )
    }// end render
}//end component

export default withRouter(connect(
    store => ({
        shoppingCart: store.shoppingCart
    })
)(ShoppingCart));