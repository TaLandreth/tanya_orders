import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import { updateCart } from "../dispatcher/actions"
import { withRouter } from 'react-router-dom'
import MediaQuery from 'react-responsive'

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
            var i, total = 0
            for (i; i < this.props.line.count; i++) { total += this.props.line.productprice * this.props.line.quantity }

            return (

                <div>
                
                    <MediaQuery query="(max-device-width: 600px)">
                    <div className="cart-div-container-narrow">
                        <div className="cart-div" key={this.props.line.productname}>{this.props.line.productname}</div>
                        <div className="cart-div-qty" key={this.props.line.quantity}>{this.props.line.quantity}</div>
                        <div className="cart-div" key={this.props.line.productprice}>${this.props.line.productprice.toFixed(2)}</div>
                        <div className="cart-div" key={i++}>${(this.props.line.productprice * this.props.line.quantity).toFixed(2)}
                        </div>
                        <div className="fromcart" key={i++} onClick={this.removeItem.bind(this, this.props.line.productdetailsid)}>Remove
                        </div>

                    </div>
                    </MediaQuery>


                    <MediaQuery query="(min-device-width: 600px)">
                    <div className="cart-div-container">
                        <div className="cart-div" key={this.props.line.productname}>{this.props.line.productname}</div>
                        <div className="cart-div-qty" key={this.props.line.quantity}>{this.props.line.quantity}</div>
                        <div className="cart-div" key={this.props.line.productprice}>${this.props.line.productprice.toFixed(2)}</div>
                        <div className="cart-div" key={i++}>${(this.props.line.productprice * this.props.line.quantity).toFixed(2)}
                        </div>
                        <div className="fromcart" key={i++} onClick={this.removeItem.bind(this, this.props.line.productdetailsid)}>Remove
                        </div>

                    </div>
                    </MediaQuery>





                </div>
            )
        }
    }// end render
}//end cart component

export default withRouter(connect(
    store => ({
        userId: store.userId,
        shoppingCart: store.shoppingCart,
        productList: store.productList,
    })
)(Cart));