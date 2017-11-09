import React, { Component } from 'react'
import '../App.css'
import { connect } from "react-redux"

class OneOrder extends Component {

    render() {

        console.log("# of lines: " + this.props.ord.lineitems.length)
        

        var i, total = 0
        for (i; i < this.props.ord.lineitems.length; i++) {
            total += this.props.ord.lineitems[i].quantity * this.props.ord.productDetails[i].price


            console.log("Quantity: " + this.props.ord.lineitems[i].quantity)
            console.log("Price: " + this.props.ord.productDetails[i].price)

        }

        var status = ""
        if (this.props.ord.orderStatus === 0) {
            status = "Processing"
        }
        if (this.props.ord.orderStatus === 1) {
            status = "Completed"
        }
        if (this.props.ord.orderStatus === 2) {
            status = "Canceled"
        }

        return (
            <div className="one-order-display">
                <div className="one-order-heading">
                    <div>Order # {this.props.ord.id}</div>
                    <div>Date: {this.props.ord.orderDate}</div>
                    <div>Status: {status}</div>
                </div>

                <div className="one-order-details">
                    <div>{this.props.ord.customerDetails.name}</div>
                    <div>Billing Address:
                    <div>{this.props.ord.addresses[0].street}</div>
                        <div>{this.props.ord.addresses[0].city}, {this.props.ord.addresses[0].state} {this.props.ord.addresses[0].zip}</div>
                    </div>
                    <div>Shipping Address:
                    <div>{this.props.ord.addresses[1].street}</div>
                        <div>{this.props.ord.addresses[1].city}, {this.props.ord.addresses[1].state} {this.props.ord.addresses[1].zip}</div>
                    </div>

                    <div>Shipping Details: {this.props.ord.shipmethod.carrier}, {this.props.ord.shipmethod.method}</div>
                </div>

                <div className="one-order-heading">Items:</div>

                <div className="one-order-details">

                    <div className="one-order-itemdetails">
                        {this.props.ord.productDetails.map((p) =>
                            <div className="one-order-items">{p.name}<br /> Unit Price: ${p.price}<br />
                                <img src={p.image} alt={p.name} />
                            </div>
                        )}
                    </div>

                    <div className="one-order-itemdetails">
                        {this.props.ord.lineitems.map((l) => <div className="one-order-items">Quantity: {l.quantity}</div>)}
                    </div>

                </div>

                <div className="one-order-heading">Total Due: ${total.toFixed(2)}</div>


            </div>
        )
    }// end render
}//end component
export default connect(
    store => ({


    })
)(OneOrder);