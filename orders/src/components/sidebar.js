import React, { Component } from 'react'
import '../App.css'
import Popup from 'react-popup'
import { connect } from "react-redux"
import Cart from './cart'
import { Link, withRouter } from 'react-router-dom'

class Sidebar extends Component {

    render() {
        return (
            <div className="sidebar-container">
                <div className="product-filter">
                POPULAR PRODUCTS:
                <div>Tungsten Carbide Products</div>
                    <div>Beveling Hand Tools & Machines</div>
                    </div>
                    <div className="product-filter">
                Subscribe to our newsletter!
                <input type="text" placeholder=" Your Name" />
                <input type="text" placeholder=" Your Email" />
                <button>SUBSCRIBE NOW</button>

                    </div>
                    <div className="product-filter">
                    TRENDING:
                    <div className="trend">Tungsten Carbide</div>
                        <div className="trend">Beveling</div>
                        <div className="trend">Tools</div>
                        <div className="trend">Manufacturing</div>
                        <div className="trend">Metal</div>



                    </div>
                </div>
        )
    }
}
export default withRouter(connect(
    store => ({
        userId: store.userId,
        shoppingCart: store.shoppingCart,
        productList: store.productList,
    })
)(Sidebar));

//