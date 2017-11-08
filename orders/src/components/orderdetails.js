import React, { Component } from 'react'
import '../App.css'
import MediaQuery from 'react-responsive'
import { connect } from "react-redux"

class OrderDetails extends Component {
    render() {

        let index = this.props.orderList.findIndex(i => i.orderId === this.props.ord.orderId)
        let bg = ''

        if(index % 2 !== 0){
            bg = "order-list-tr"
        }
        else {bg = "order-list-tr-gray"}

        var stat, disabled, color
        if (this.props.ord.orderStat === 0) {
            stat = "Processing"
            color = "order-cell-goldenrod"
            disabled = false
        }
        if (this.props.ord.orderStat === 1) {
            stat = "Completed"
            color = "order-cell-green"
            disabled = true
        }
        if (this.props.ord.orderStat === 2) {
            stat = "Canceled"
            color = "order-cell-red"
            disabled = true
        }
        return (
            <tr className={bg}>
                <td className="order-cell"><h5>Order #:<br/>{this.props.ord.orderId}</h5></td>
                <td className="order-cell">Date:<br/>{this.props.ord.date}</td>
                <td className={color}>Status:<br/>{stat}</td>
                <td className="order-cell">Total:<br/>${this.props.ord.total.toFixed(2)}</td>
                <td className="order-cell">{disabled ? <div></div>:<button className="cancel-order-btn" title="Cancel Order"
                        onClick={this.props.cancelOrder.bind(this, this.props.ord.orderId)}>Cancel Order</button>}</td>
            </tr>
        )
    }// end render
}//end component
export default connect(
    store => ({
      orderList: store.orderList,
      orderCount: store.orderCount
    })
  )(OrderDetails);