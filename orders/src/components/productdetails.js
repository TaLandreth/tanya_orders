import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import { addToCart, updateCart } from "../dispatcher/actions"
import MediaQuery from 'react-responsive'
import ReactModal from 'react-modal'


class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            shoppingCart: this.props.shoppingCart,
            index: this.props.productList.findIndex(i => i.id === this.props.prod.id),
            modalIsOpen: false
        }
        this.addToCart = this.addToCart.bind(this)
    }

    inputUpdate(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({
            showModal: false
        });
    }

    addToCart(productid, productname, price) {

        let qty = Number(this.state.qty)
        let index = this.props.shoppingCart.findIndex(i => i.productdetailsid === productid) 
        let subtotal = price * qty  

        console.log("Index of item: " + index)

        if (index >= 0) {

            var newCart = this.props.shoppingCart.slice()   //copy

            newCart[index].quantity += Number(this.state.qty)
            newCart[index].subtotal = newCart[index].quantity * price
            console.log("On add click: " + newCart[index].quantity)
            //Send it off to cart store
    
            updateCart(this.props.dispatch, newCart)

            this.handleOpenModal()
            
                        setTimeout(() => {
                            this.handleCloseModal()
                        }, 1500)
        }

        else {
            if (this.state.qty < 1) {
                qty = 1
                let newItem = { id: null, productdetailsid: productid, productname: productname, productprice: price, quantity: qty, subtotal: subtotal }
                //console.log(newItem)
                addToCart(this.props.dispatch, newItem)
            }

            else {
                qty = this.state.qty
                let newItem = { id: null, productdetailsid: productid, productname: productname, productprice: price, quantity: qty, subtotal: subtotal }
                //console.log(newItem)
                addToCart(this.props.dispatch, newItem)
            }

            this.handleOpenModal()

            setTimeout(() => {
                this.handleCloseModal()
            }, 1500)
        }
    }

    render() {

        return (
            <div>
                <MediaQuery query="(min-device-width: 600px)">
                    <div className="product-details-rows">
                        <div className="prod-img-view"><img src={this.props.prod.image} alt="Product" /></div>
                        <div className="prod-display-individual" key={this.props.prod.id}>

                            <div className="prod-div-inner"><h2>{this.props.prod.name}</h2></div>
                            <div className="prod-price-gold">{"$" + this.props.prod.price.toFixed(2)}</div>

                            <div className="prod-div-inner-text"><h6>{this.props.prod.description}</h6></div>

                            <MediaQuery query="(max-device-width: 600px)">
                                <div className="choice-holders-NARROW">
                                    <div className="prod-div"><h6>Quantity:</h6>
                                        <input type="number" min="1" max="4000" value={this.state.qty} 
                                        name="qty" placeholder="1" onChange={this.inputUpdate.bind(this)} /></div>

                                    <div className="prod-div">
                                        <button className="add-to-cart" onClick={this.addToCart.bind(this, this.props.prod.id, this.props.prod.name, this.props.prod.price)}>
                                            <span className="glyphicon glyphicon-shopping-cart"></span> Add To Cart</button></div>
                                </div>

                            </MediaQuery>

                            <MediaQuery query="(min-device-width: 600px)">
                                <div className="choice-holders">
                                    <div className="prod-div"><h6>Quantity:</h6>
                                        <input type="number" min="1" max="4000" value={this.state.qty} 
                                        name="qty" placeholder="1" onChange={this.inputUpdate.bind(this)} /></div>

                                    <div className="prod-div">
                                        <button className="add-to-cart" onClick={this.addToCart.bind(this, this.props.prod.id, this.props.prod.name, this.props.prod.price)}>
                                            <span className="glyphicon glyphicon-shopping-cart"></span> Add To Cart</button></div>
                                </div>
                            </MediaQuery>

                            <div className="return-to-catalog" onClick={this.props.returnToCatalog}>
                                <span className="glyphicon glyphicon-hand-left"></span>&nbsp;RETURN TO CATALOG</div>
                        </div>
                        
                    </div>

                </MediaQuery>

                <MediaQuery query="(max-device-width: 600px)">

                    <div className="product-details-cols">
                        <div className="prod-img-view-narrow"><img src={this.props.prod.image} alt="Product" /></div>
                        <div className="prod-display-individual-narrow" key={this.props.prod.id}>

                            <div className="return-to-catalog-narrow" onClick={this.props.returnToCatalog}>
                                <span className="glyphicon glyphicon-hand-left"></span>&nbsp;RETURN TO CATALOG</div>

                            <div className="prod-div-inner"><h4>{this.props.prod.name}</h4>
                            <div className="prod-price-gold-narrow">{"$" + this.props.prod.price.toFixed(2)}</div></div>

                            <div className="prod-div-inner-text"><h6>{this.props.prod.description}</h6></div>

                            <MediaQuery query="(max-device-width: 600px)">
                                <div className="choice-holders-NARROW">
                                    <div className="prod-div">
                                        <input type="number" min="1" max="4000" value={this.state.qty} name="qty" placeholder="1" onChange={this.inputUpdate.bind(this)} /></div>

                                    <div className="prod-div">
                                        <button className="add-to-cart" onClick={this.addToCart.bind(this, this.props.prod.id, this.props.prod.name, this.props.prod.price)}>
                                            <span className="glyphicon glyphicon-shopping-cart"></span> Add To Cart</button></div>
                                </div>
                            </MediaQuery>

                            <MediaQuery query="(min-device-width: 600px)">
                                <div className="choice-holders">
                                    <div className="prod-div"><h6>Quantity:</h6>
                                        <input type="number" min="1" max="4000" value={this.state.qty} name="qty" placeholder="1" onChange={this.inputUpdate.bind(this)} /></div>

                                    <div className="prod-div">
                                        <button className="add-to-cart" onClick={this.addToCart.bind(this, this.props.prod.id, this.props.prod.name, this.props.prod.price)}>
                                            <span className="glyphicon glyphicon-shopping-cart"></span> Add To Cart</button></div>
                                </div>
                            </MediaQuery>


                        </div>
                    </div>


                </MediaQuery>

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Added to Cart"
                    className="modal-content-addtocart"
                    overlayClassName="modal-overlay">
                    <div className="addtocart-confirm">
                        Added to cart:<br />{this.props.prod.name} <br />
                        Quantity: {this.state.qty}
                    </div>
                </ReactModal>


            </div>





        )
    }// end render
}//end component

export default connect(
    store => ({
        productList: store.productList,
        productDetails: store.productDetails,
        shoppingCart: store.shoppingCart
    })
)(ProductDetails);