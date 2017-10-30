import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import LineItem from '../models/lineitem'
import { addToCart } from "../dispatcher/actions"
import Popup from 'react-popup'
import { withRouter } from 'react-router-dom'

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            index: this.props.orderList.findIndex(i => i.id === this.props.order.id)
        }
    }

    inputUpdate(e) { this.setState({ [e.target.name]: e.target.value }) }

    render() {

        return (
            <div className={this.state.index % 2 === 0 ? "prod-display-alt1" : "prod-display-alt2"} key={this.props.order.id}>
                <div className="prod-div">
                    <button>Cancel Order</button></div>
            </div>
        )
    }// end render
}//end component

export default withRouter(connect(
    store => ({
        orderCount: store.orderCount,
        orderList: store.orderList,
    })
)(OrderDetails));