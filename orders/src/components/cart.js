import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import { updateCart } from "../dispatcher/actions"
import { withRouter } from 'react-router-dom'

class Cart extends Component {

    removeItem(lineid) {

        var index = this.props.shoppingCart.findIndex(i => i.productdetailsid === lineid);

        var newCart = this.props.shoppingCart.slice()   //copy
        newCart.splice(index, 1) //cut out the right one

        console.log("On remove click: " + newCart)

        //Send it off to cart store
        updateCart(this.props.dispatch, newCart)
    }

    render() {

        if (this.props.line === "No items") {
            return (
                <h3>No items</h3>
            )
        }
        else {
            let i = 0
            return (
                <div>
                    <div className="cart-div">
                        <div className="cart-div" key={this.props.line.productname}>{this.props.line.productname}</div>
                        <div className="cart-div" key={this.props.line.quantity}>Qty: {this.props.line.quantity}</div>
                        <div className="cart-div" key={this.props.line.productprice}>${this.props.line.productprice.toFixed(2)}</div>
                        <div className="cart-div" key={i++}>
                            <button className="fromcart" onClick={this.removeItem.bind(this, this.props.line.productdetailsid)} title="Remove Item"> x </button>
                        </div>
                    </div>

                    <div className="cart-total">

                    </div>
                </div>
            )
        }
    }// end render
}//end cart component

export default withRouter(connect(
    store => ({
        shoppingCart: store.shoppingCart,
        productList: store.productList,
    })
)(Cart));