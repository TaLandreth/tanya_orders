import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import { addToCart } from "../dispatcher/actions"
import MediaQuery from 'react-responsive'

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            shoppingCart: this.props.shoppingCart,
            index: this.props.productList.findIndex(i => i.id === this.props.prod.id)
        }
        this.addToCart = this.addToCart.bind(this)
    }

    inputUpdate(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addToCart(productid, productname, price) {

        let newItem = { id: null, productdetailsid: productid, productname: productname, productprice: price, quantity: Number(this.state.qty) }
        //console.log(newItem)
        addToCart(this.props.dispatch, newItem)
    }

    render() {
        return (
            <div>

                <MediaQuery query="(min-device-width: 600px)">

                    <div className="product-details-rows">
                        <div className="prod-img-view"><img src={this.props.prod.image} alt="Product" /></div>
                        <div className="prod-display-individual" key={this.props.prod.id}>

                            <div className="return-to-catalog" onClick={this.props.returnToCatalog}>
                                <span className="glyphicon glyphicon-hand-left"></span>&nbsp;Return to Catalog</div>

                            <div className="prod-div-inner"><h2>{this.props.prod.name}</h2></div>
                            <div className="prod-price-gold">{"$" + this.props.prod.price.toFixed(2)}</div>

                            <div className="prod-div-inner-text"><h6>{this.props.prod.description}</h6></div>

                            <MediaQuery query="(max-device-width: 600px)">
                                <div className="choice-holders-NARROW">
                                    <div className="prod-div"><h6>Quantity:</h6>
                                        <input type="number" min="1" name="qty" placeholder="0" onChange={this.inputUpdate.bind(this)} /></div>

                                    <div className="prod-div">
                                        <button className="add-to-cart" onClick={this.addToCart.bind(this, this.props.prod.id, this.props.prod.name, this.props.prod.price)}>
                                            <span className="glyphicon glyphicon-shopping-cart"></span> Add To Cart</button></div>
                                </div>
                            </MediaQuery>

                            <MediaQuery query="(min-device-width: 600px)">
                                <div className="choice-holders">
                                    <div className="prod-div"><h6>Quantity:</h6>
                                        <input type="number" min="1" name="qty" placeholder="0" onChange={this.inputUpdate.bind(this)} /></div>

                                    <div className="prod-div">
                                        <button className="add-to-cart" onClick={this.addToCart.bind(this, this.props.prod.id, this.props.prod.name, this.props.prod.price)}>
                                            <span className="glyphicon glyphicon-shopping-cart"></span> Add To Cart</button></div>
                                </div>
                            </MediaQuery>


                        </div>
                    </div>

                </MediaQuery>

                <MediaQuery query="(max-device-width: 600px)">

                    <div className="product-details-cols">
                        <div className="prod-img-view-narrow"><img src={this.props.prod.image} alt="Product" /></div>
                        <div className="prod-display-individual-narrow" key={this.props.prod.id}>

                            <div className="return-to-catalog" onClick={this.props.returnToCatalog}>
                                <span className="glyphicon glyphicon-hand-left"></span>&nbsp;Return to Catalog</div>

                            <div className="prod-div-inner"><h2>{this.props.prod.name}</h2></div>
                            <div className="prod-price-gold">{"$" + this.props.prod.price.toFixed(2)}</div>

                            <div className="prod-div-inner-text"><h6>{this.props.prod.description}</h6></div>

                            <MediaQuery query="(max-device-width: 600px)">
                                <div className="choice-holders-NARROW">
                                    <div className="prod-div"><h6>Quantity:</h6>
                                        <input type="number" min="1" name="qty" placeholder="0" onChange={this.inputUpdate.bind(this)} /></div>

                                    <div className="prod-div">
                                        <button className="add-to-cart" onClick={this.addToCart.bind(this, this.props.prod.id, this.props.prod.name, this.props.prod.price)}>
                                            <span className="glyphicon glyphicon-shopping-cart"></span> Add To Cart</button></div>
                                </div>
                            </MediaQuery>

                            <MediaQuery query="(min-device-width: 600px)">
                                <div className="choice-holders">
                                    <div className="prod-div"><h6>Quantity:</h6>
                                        <input type="number" min="1" name="qty" placeholder="0" onChange={this.inputUpdate.bind(this)} /></div>

                                    <div className="prod-div">
                                        <button className="add-to-cart" onClick={this.addToCart.bind(this, this.props.prod.id, this.props.prod.name, this.props.prod.price)}>
                                            <span className="glyphicon glyphicon-shopping-cart"></span> Add To Cart</button></div>
                                </div>
                            </MediaQuery>


                        </div>
                    </div>


                </MediaQuery>
            </div>





        )
    }// end render
}//end component

export default connect(
    store => ({
        productList: store.productList,
        productDetails: store.productDetails
    })
)(ProductDetails);