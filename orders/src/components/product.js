import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import LineItem from '../models/lineitem'
import { addToCart } from "../dispatcher/actions"
import Popup from 'react-popup'
import { withRouter } from 'react-router-dom'

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            shoppingCart: this.props.shoppingCart,
            index: this.props.productList.findIndex(i => i.id === this.props.prod.id) 
        }
        this.seeProduct = this.seeProduct.bind(this)
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

    seeProduct(e) {
        Popup.create({
            title: null, // or string
            content: (
                <div className={this.state.index % 2 === 0 ? "prod-display-alt1" : "prod-display-alt2"} key={this.props.prod.id}>
    
                <div className="prod-img" onClick={this.seeProduct.bind(this)}></div>
                <div className="prod-div">
                    <div className="prod-div" key={this.props.prod.name}>{"Product: " + this.props.prod.name}</div>
                    <div className="prod-div" key={this.props.prod.id}>{"Product I.D.: " + this.props.prod.id}</div>
                    <div className="prod-div" key={this.props.prod.price}>{"$" + this.props.prod.price.toFixed(2)}</div>
                    <div className="prod-div"> Quantity:
                    <input type="number" min="1" name="qty" placeholder="0" onChange={this.inputUpdate.bind(this)} /></div>
                    <div className="prod-div">
                    <button onClick={this.addToCart.bind(this, this.props.prod.id, this.props.prod.name, this.props.prod.price)}>Add To Cart</button></div>
                </div>
                </div>
            ), // or a react component (to set html you have to use a component, the string will be escaped)
            buttons: {
                left: ['cancel'],
                right: ['ok']
            }
        });
    }

    render() {

        return (
            <div className={this.state.index % 2 === 0 ? "prod-display-alt1" : "prod-display-alt2"} key={this.props.prod.id}>

            <div className="prod-img" onClick={this.seeProduct.bind(this)}></div>
            <div className="prod-div">
                <div className="prod-div" key={this.props.prod.name}>{"Product: " + this.props.prod.name}</div>
                <div className="prod-div" key={this.props.prod.id}>{"Product I.D.: " + this.props.prod.id}</div>
                <div className="prod-div" key={this.props.prod.price}>{"$" + this.props.prod.price.toFixed(2)}</div>
                <div className="prod-div"> Quantity:
                <input type="number" min="1" name="qty" placeholder="1" onChange={this.inputUpdate.bind(this)} /></div>
                <div className="prod-div">
                <button onClick={this.addToCart.bind(this, this.props.prod.id, this.props.prod.name, this.props.prod.price)}>Add To Cart</button></div>
            </div>
            </div>
        )
    }// end render
}//end BookShelf component

export default withRouter(connect(
    store => ({
        shoppingCart: store.shoppingCart,
        productList: store.productList,
    })
)(Product));
////// LONGER TERM GOALS:
// - consolidate products when added (versus new line each time clicked)