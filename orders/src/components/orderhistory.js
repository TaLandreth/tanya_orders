import React, { Component } from 'react'
import { connect } from "react-redux"
import InfiniteScroll from 'react-infinite-scroll-component'
import '../App.css'
import OrderDetails from './orderdetails'
import { getOrderCount, getOrders, cancelOrder } from "../dispatcher/actions"
import MediaQuery from 'react-responsive'


class OrderHistory extends Component {
  constructor() {
    super();
    this.state = {
      //Paging
      startVal: 0,
      viewAmt: 10,
      moreOrds: false
    };

    this.cancelOrder = this.cancelOrder.bind(this);
  }

  componentWillMount() {
    let instructions = {
      viewAmt: this.state.viewAmt,
      startVal: this.state.startVal,
      userId: this.props.userId.id
    }
    getOrders(this.props.dispatch, instructions)
    getOrderCount(this.props.dispatch, instructions)
  }

  changeInputs = e => { this.setState({ [e.target.name]: e.target.value }) }

  cancelOrder(id) {

    let instructions = {
      startVal: this.state.startVal,
      viewAmt: this.state.viewAmt,
      userId: this.props.userId.id
    }
    cancelOrder(this.props.dispatch, id, instructions)
  }

  render() {

    return (
      <div className="order-container">
        <div className="order-title"><h3>Order History</h3></div>

        {/* RESPONSIVE */}
        <MediaQuery query="(max-device-width: 600px)">
          <div className="order-list-narrow">
            {this.props.orderList.map((b) =>
              <OrderDetails key={b.id} ord={b}
                cancelOrder={this.cancelOrder.bind(this)} />)}
          </div>
        </MediaQuery>

        {/* STANDARD */}
        <MediaQuery query="(min-device-width: 600px)">
          <div className="order-list">
            {this.props.orderList.map((b) =>
              <OrderDetails key={b.id} ord={b}
                cancelOrder={this.cancelOrder.bind(this)} />)}
          </div>
        </MediaQuery>
      </div>
    )
  }// end render
}//end component

export default connect(
  store => ({
    userId: store.userId,
    orderList: store.orderList,
  })
)(OrderHistory);
