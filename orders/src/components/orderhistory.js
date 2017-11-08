import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import OrderDetails from './orderdetails'
import { getOrderCount, getOrders, cancelOrder } from "../dispatcher/actions"
import MediaQuery from 'react-responsive'
import Pagination from 'react-js-pagination'

class OrderHistory extends Component {
  constructor() {
    super();
    this.state = {
      //Paging
      startVal: 0,
      viewAmt: 12,
      page: 1,
    };

    this.cancelOrder = this.cancelOrder.bind(this);
    this.getMoreOrders = this.getMoreOrders.bind(this);
  }

  componentWillMount() {
    let instructions = {
      viewAmt: this.state.viewAmt,
      startVal: this.state.startVal,
      userId: this.props.userId.customerId
    }

    getOrders(this.props.dispatch, instructions)
    getOrderCount(this.props.dispatch, instructions.userId)
  }

  changeInputs = e => { this.setState({ [e.target.name]: e.target.value }) }

  cancelOrder(id) {

    let instructions = {
      startVal: this.state.startVal,
      viewAmt: this.state.viewAmt,
      userId: this.props.userId.customerId
    }
    cancelOrder(this.props.dispatch, id, instructions)
  }


  getMoreOrders(pageNumber) {
    
        var start = this.state.startVal
        var view = this.state.viewAmt
        var customer = this.props.userId.customerId
    
          start = (pageNumber - 1) * (view)
    
          let instructions = {
            viewAmt: this.state.viewAmt,
            startVal: start,
            userId: customer
          }
    
          this.setState(instructions)
    
          this.setState({ activePage: pageNumber })

          getOrders(this.props.dispatch, instructions)
      }

  render() {
    return (
      <div className="order-container">
        <div className="order-title"><h3>Order History</h3>
        <h5>Customer #{this.props.userId.customerId}</h5></div>

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
        <Pagination
                innerClass="pgs-outer"
                itemClass="pgs-inner"
                activeClass="pgs-active"
                activePage={this.state.page}
                itemsCountPerPage={this.state.viewAmt}
                pageRangeDisplayed={this.state.viewAmt}
                hideNavigation={true}
                totalItemsCount={this.props.orderCount}
                onChange={this.getMoreOrders.bind(this)}
              />

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
