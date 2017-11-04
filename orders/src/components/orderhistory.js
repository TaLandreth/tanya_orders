import React, { Component } from 'react'
import { connect } from "react-redux"
import InfiniteScroll from 'react-infinite-scroll-component'
import '../App.css'
import OrderDetails from './orderdetails'
import { getOrderCount, getOrders, cancelOrder } from "../dispatcher/actions"

class OrderHistory extends Component {
  constructor() {
    super();
    this.state = {
      //Paging
      startVal: 0,
      viewAmt: 10,
      moreOrds: false,

      refresh: true
    };

    this.cancelOrder = this.cancelOrder.bind(this);
  }

  componentWillMount() {
    let instructions = {
      viewAmt: this.state.viewAmt,
      startVal: this.state.startVal,
      userId: this.props.userId.id
    }
    
    console.log(instructions)
    getOrders(this.props.dispatch, instructions)
    getOrderCount(this.props.dispatch, instructions)

  }

  changeInputs = e => { this.setState({ [e.target.name]: e.target.value }) }

  refresh() { }

  getMoreOrders() {

    var start = this.state.startVal
    var view = this.state.viewAmt

    let instructions = {
      viewAmt: this.state.viewAmt,
      startVal: start + view,
      userId: this.props.userId.id
    
    }

    this.setState(instructions)

    getOrders(this.props.dispatch, instructions)

    //If exceed # of records pulled, stop scrolling
    if (this.props.orderCount === this.props.orderCount.length) {
      this.setState({ moreOrds: false })
    }
  }

  cancelOrder(id) {

    let instructions = {
      startVal: this.state.startVal,
      viewAmt: this.state.viewAmt,
      userId: this.props.userId.id
    }

    //console.log("Canceled order# " + id)
    //console.log("Canceled instructions# " + instructions)

    cancelOrder(this.props.dispatch, id, instructions)

    //getOrders(this.props.dispatch, instructions)

  }


  render() {

    //console.log("In orders Page")

    //console.log("Order list: " + this.props.orderList.length)

    return (
      <div className="order-container">
        <div className="order-title"><h3>Order History</h3>        </div>
          <div className="order-list">
            <InfiniteScroll
              next={this.getMoreOrders.bind(this)}
              hasMore={this.state.moreOrds}
              key={Math.random()}>
              {this.props.orderList.map((b) =>
                <OrderDetails key={b.id} ord={b}
                  cancelOrder={this.cancelOrder.bind(this)} />)}
            </InfiniteScroll>
          </div>
      </div>
    )
  }// end render
}//end component

export default connect(
  store => ({
    userId: store.userId,
    orderList: store.orderList,
    orderCount: store.orderCount
  })
)(OrderHistory);
