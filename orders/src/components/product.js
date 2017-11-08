import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import LineItem from '../models/lineitem'
import { addToCart } from "../dispatcher/actions"

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            shoppingCart: this.props.shoppingCart,
            index: this.props.productList.findIndex(i => i.id === this.props.prod.id),
            //View product
        }
        this.addToCart = this.addToCart.bind(this)
    }

    inputUpdate(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addToCart(productid, productname, price) {
        let newItem = new LineItem(productid, productname, price, Number(this.state.qty))
        //console.log(newItem)
        addToCart(this.props.dispatch, newItem)
    }

    render() {

            return (
                <div>
                <figure onClick={this.props.seeProduct.bind(this, this.props.prod)}>
                    <img src={this.props.prod.image} alt="Product"/>
                    <div className="prod-div-inner-duo"><div className="prod-pad">{this.props.prod.name}</div>
                    <div className="prod-pad">{"$" + this.props.prod.price.toFixed(2)}</div></div>
                    <div className="prod-div-shortdesc">{this.props.prod.shortDesc}</div>
                </figure>
                </div>
            )
    }// end render
}//end component

export default connect(
    store => ({
        shoppingCart: store.shoppingCart,
        productList: store.productList,
    })
)(Product);
////// LONGER TERM GOALS:
// - consolidate products when added (versus new line each time clicked)