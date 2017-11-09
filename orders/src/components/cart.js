import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import { updateCart, clearCart } from "../dispatcher/actions"
import { withRouter } from 'react-router-dom'
import MediaQuery from 'react-responsive'

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: this.props.line.quantity
        }
        this.removeItem = this.removeItem.bind(this)
        this.updateItem = this.updateItem.bind(this)
    }

    inputUpdate(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    removeItem(lineid) {
        var index = this.props.shoppingCart.findIndex(i => i.productdetailsid === lineid);
        var newCart = this.props.shoppingCart.slice()   //copy
        newCart.splice(index, 1) //cut out the right one
        console.log("On remove click: " + newCart)
        //Send it off to cart store

        if (newCart.length === 0) {
            clearCart(this.props.dispatch)
        }
        else {
            updateCart(this.props.dispatch, newCart)
        }
    }

    updateItem(lineid, price) {
        var index = this.props.shoppingCart.findIndex(i => i.productdetailsid === lineid);
        var newCart = this.props.shoppingCart.slice()   //copy

        newCart[index].quantity = this.state.qty
        newCart[index].subtotal = Number(this.state.qty) * price
        console.log("On update click: " + newCart[index].quantity)
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
                    {/* RESPONSIVE */}
                    <MediaQuery query="(max-device-width: 600px)">
                        <div className="cart-div-product-narrow" key={this.props.line.productname}>{this.props.line.productname}
                            <div className="cart-div-container-narrow">
                                <div className="cart-div" key={this.props.line.quantity}>

                                    <input type="number" min="1" max="4000" value={this.state.qty}
                                        name="qty" placeholder={this.props.line.quantity} onChange={this.inputUpdate.bind(this)} />
                                    @ ${this.props.line.productprice.toFixed(2)} each</div>
                                <div className="fromcart" key={i++} onClick={this.updateItem.bind(this, this.props.line.productdetailsid, this.props.line.productprice)}>
                                    <span className="glyphicon glyphicon-saved"></span>
                                </div>
                                <div className="fromcart" key={"B" + i++} onClick={this.removeItem.bind(this, this.props.line.productdetailsid)}>
                                    <span className="glyphicon glyphicon-trash"></span>
                                </div>

                            </div>
                            <div className="cart-div-total" key={"A" + i++}>SubTotal: ${this.props.line.subtotal.toFixed(2)}
                            </div>
                        </div>
                    </MediaQuery>

                    {/* STANDARD */}
                    <MediaQuery query="(min-device-width: 600px)">
                        <div className="cart-div-product" key={this.props.line.productname}>{this.props.line.productname}
                            <div className="cart-div-container">
                                <div className="cart-div" key={this.props.line.quantity}>
                                    <input type="number" min="1" max="4000" value={this.state.qty}
                                        name="qty" placeholder={this.props.line.quantity} onChange={this.inputUpdate.bind(this)} />
                                    @ ${this.props.line.productprice.toFixed(2)} each</div>

                                <div className="fromcart" key={i++} onClick={this.updateItem.bind(this, this.props.line.productdetailsid, this.props.line.productprice)}>
                                    <span className="glyphicon glyphicon-saved"></span>
                                </div>
                                <div className="fromcart" key={"B" + i++} onClick={this.removeItem.bind(this, this.props.line.productdetailsid)}>
                                    <span className="glyphicon glyphicon-trash"></span>

                                </div>
                            </div>
                            <div className="cart-div-total" key={"A" + i++}>SubTotal: ${this.props.line.subtotal.toFixed(2)}
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