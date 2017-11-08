import React, { Component } from 'react'
import '../App.css'
import MediaQuery from 'react-responsive'


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
            color = "green"
            disabled = true
        }
        if (this.props.ord.orderStat === 2) {
            stat = "Canceled"
            color = "red"
            disabled = true
        }

        return (
            <div className="order-bundle">
                <div className="order-item">
                    <div className="order-div-heading">
                        <div className="order-div" key={this.props.ord.orderId}><h4>Order #{this.props.ord.orderId}</h4></div>
                        <div className="order-div" key={this.props.ord.date}>Date: {this.props.ord.date}</div>

                            {/* STANDARD */}
                        <MediaQuery query="(min-device-width: 600px)">

                        <div className="order-div-inner-side">
                            <div className="order-div">
                                <div className={color} key={this.props.ord.orderStat}>Status: {stat}</div>
                            </div>
                            <div className="order-div">
                                {disabled ? "" :
                                    <button className="cancel-order-btn" title="Cancel Order"
                                        onClick={this.props.cancelOrder.bind(this, this.props.ord.orderId)}>Cancel Order</button>}
                            </div>
                                <div className="order-item">
                                    <div key={this.props.ord.orderId}>Total: ${this.props.ord.total.toFixed(2)}</div>
                            </div>

                            </div>
                        </MediaQuery>

                        {/* RESPONSIVE */}
                        <MediaQuery query="(max-device-width: 600px)">

                            <div className="order-div-heading-narrow">
                                <div className={color} key={this.props.ord.orderStat}>Status: {stat}</div>

                                {disabled ? "" :
                                    <button className="cancel-order-btn" title="Cancel Order"
                                        onClick={this.props.cancelOrder.bind(this, this.props.ord.orderId)}>Cancel Order</button>}
                            </div>
                            <div className="order-item">
                                <div className="order-div-inner">
                                    <div key={this.props.ord.orderId}>Total: ${this.props.ord.total.toFixed(2)}</div>
                                </div>


                            </div>


                        </MediaQuery>

                    </div>
                </div>
            </div>
        )
    }// end render
}//end component