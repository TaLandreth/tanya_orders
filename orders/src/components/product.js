import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import LineItem from '../models/lineitem'
import {addToCart} from "../dispatcher/actions"

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            shoppingCart: this.props.shoppingCart
        }
    }

    inputUpdate(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addToCart(id){

        let qty = this.state.qty

        //add product/qty to shopping cart array
        let newItem = new LineItem(null, id, Number(qty))

        console.log("Add To Cart: " + newItem.productid + ", " + newItem.quantity)

        //Send to cart store
        addToCart(this.props.dispatch, newItem)
    }

    
    render() {

        var index = this.props.productList.findIndex(i => i.id === this.props.prod.id);

            return (
            <div className={index % 2 === 0 ? "prod-display-alt1" : "prod-display-alt2"} key={this.props.prod.id}>

                <div className="prod-img">[IMAGE]</div>

                <div className="prod-div">
                <div className="prod-div" key={this.props.prod.name}>{"Product: " + this.props.prod.name}</div>
                <div className="prod-div" key={this.props.prod.id}>{"Product I.D.: " + this.props.prod.id}</div>
                <div className="prod-div" key={this.props.prod.price}>{"$"+this.props.prod.price.toFixed(2)}</div>
                <div className="prod-div"> Quantity: 
                    <input type="number" min="1" name="qty" placeholder="1" onChange={this.inputUpdate.bind(this)}/></div>
                <div className="prod-div"><button onClick={this.addToCart.bind(this, this.props.prod.id)}>Add To Cart</button></div>
                </div>


            </div>
            )
    }// end render
}//end BookShelf component

export default connect(
    store => ({
        shoppingCart: store.shoppingCart,
        productList: store.productList,
    })
)(Product);
