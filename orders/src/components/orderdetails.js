import React, { Component } from 'react'
import '../App.css'

export default class OrderDetails extends Component {
    render() {

        var stat, disabled, color
        if (this.props.ord.orderStat === 0) {
            stat = "Processing"
            color = "goldenrod"
            disabled = false
        }
        if (this.props.ord.orderStat === 1) {
            stat = "Completed"
            color="green"
            disabled = true
        }
        if (this.props.ord.orderStat === 2) {
            stat = "Canceled"
            color="red"
            disabled = true
        }

        return (
            <div className="order-item">
                <div className="order-div-heading">
                    <div className="order-div" key={this.props.ord.orderId}><h4>Order #{this.props.ord.orderId}</h4></div>
                    <div className="order-div" key={this.props.ord.customerId}>Customer #{this.props.ord.customerId}</div>
                    <div className="order-div" key={this.props.ord.date}>Date: {this.props.ord.date}</div>

                </div>
                 <div className="order-div-inner">
                    <div className="order-div-inner" key={this.props.ord.orderId}>Total: ${this.props.ord.total.toFixed(2)}</div>
                    </div>

                <div className="order-div-actions">
                    <div className={color} key={this.props.ord.orderStat}>Status: {stat}</div>
                    <div className="order-div">{disabled ? "" :
                        <button className="cancel-order-btn" title="Cancel Order" onClick={this.props.cancelOrder.bind(this, this.props.ord.orderId)}>Cancel Order</button>}
                    </div>
                </div>
            </div>
        )
    }// end render
}//end component