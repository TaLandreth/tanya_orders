import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import { withRouter } from 'react-router-dom'

class OrderDetails extends Component {
    render() {

        var stat
        var disabled
        if (this.props.ord.orderStat === 0) {
            stat = "Processing"
            disabled = false
        }
        if (this.props.ord.orderStat === 1) {
            stat = "Completed"
            disabled = true
        }
        if (this.props.ord.orderStat === 2) {
            stat = "Canceled"
            disabled = true
        }

        return (
            <div>
                <div className="order-item">
                    <div className="order-div-heading">
                        <div className="order-div" key={this.props.ord.orderId}><h4>Order #{this.props.ord.orderId}</h4></div>
                        <div className="order-div" key={this.props.ord.date}>Order Date: {this.props.ord.date}</div>
                        <div className="order-div">{disabled ? "" :
                            <button className="cancel-order-btn" title="Cancel Order" onClick={this.props.cancelOrder.bind(this, this.props.ord.orderId)}>Cancel Order</button>}
                        </div>

                    </div>
                    <div className="order-div-inner" key={this.props.ord.customerId}>Customer #{this.props.ord.customerId}</div>
                    <div className="order-div-inner" key={this.props.ord.orderStat}>Status: {stat}</div>
                    <div className="order-div-inner" key={this.props.ord.orderId}>Order Total: ${this.props.ord.total}</div>
                </div>
            </div>
        )
    }// end render
}//end component

export default withRouter(connect(
    store => ({
    })
)(OrderDetails));