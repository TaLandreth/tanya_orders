import React, { Component } from 'react'
import { connect } from "react-redux"
import InfiniteScroll from 'react-infinite-scroll-component'
import '../App.css'
import { getOrders, getOrderCount } from "../dispatcher/actions"
import OrderDetails from "./orderdetails"
import { Route, withRouter } from 'react-router-dom'

class Orders extends Component {
  constructor() {
    super();
    this.state = {
      //Paging
      moreOrds: true,
      startVal: 0,
      viewAmt: 10,
      //Filter/Product selection
      filter: "all"
    };
    this.getMoreOrders = this.getMoreOrders.bind(this);
  }

  componentDidMount() {
    let instructions = {
      viewAmt: this.state.viewAmt,
      startVal: this.state.startVal,
      userid: this.props.userid
    }
    //console.log(instructions)
    getOrders(this.props.dispatch, instructions)
    getOrderCount(this.props.dispatch, instructions)
  }

  changeInputs = e => { this.setState({ [e.target.name]: e.target.value }) }

  refresh() {}

  getMoreOrders() {
    //Establish records to pull
    var start = this.state.startVal
    var view = this.state.viewAmt

    //Ready instructions: viewAmt, startVal, userId
    let instructions = {
      viewAmt: this.state.viewAmt,
      startVal: start + view,
      userid: this.props.userid
    }

    //console.log("Insructions: " + start + ", " + view)

    this.setState(instructions)

    //If exceed # of records pulled, stop scrolling
    if (this.props.orderCount === this.props.orderList.length) {
      this.setState({ moreOrds: false })
    }
    //Send instructions:
    getOrders(this.props.dispatch, instructions)
  }

  render() {
    //console.log("Order count: " + this.props.orderCount)
    //console.log("OrderList count: " + this.props.orderList.length)
    //console.log(this.props.orderList)

    let i = 0

    return (
      <Route component='/orders'>
       <h2>Testing</h2>
      
      
      <div className="catalog-title">
        <h1>Order History</h1>
        <div className="product-list">
        <InfiniteScroll
        key={i++}
          refreshFunction={this.refresh}
          next={this.getMoreOrders.bind(this)}
          hasMore={this.state.moreOrds} >
          {this.props.orderList.map((b) => <OrderDetails key={this.props.orderCount.length + i++} order={b} />)}
        </InfiniteScroll>
        </div>
      </div>
    </Route>)
  }// end render
}//end component

export default withRouter(connect(
  store => ({
    productList: store.productList,
    userid: store.userid,
    orderCount: store.orderCount,
    orderList: store.orderList
    
  })
)(Orders));

//TO DO
//-- UPDATE QUANTITY IN CART
//