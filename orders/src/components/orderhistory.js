import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import OrderDetails from './orderdetails'
import OneOrder from './order'
import { getOrderCount, getOrders, getOrderById, cancelOrder } from "../dispatcher/actions"
import MediaQuery from 'react-responsive'
import Pagination from 'react-js-pagination'
import ReactModal from 'react-modal'


class OrderHistory extends Component {
  constructor() {
    super();
    this.state = {
      //Paging
      startVal: 0,
      viewAmt: 12,
      page: 1,
      showModal: false,
      showModalResponsive: false,
      showModalConfirm: false,

      cancelOrder: 0,

      content: null
    };

    this.cancelOrder = this.cancelOrder.bind(this);
    this.getMoreOrders = this.getMoreOrders.bind(this);
    this.getOrder = this.getOrder.bind(this);

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleOpenModalConfirm = this.handleOpenModalConfirm.bind(this);

    this.handleOpenModalResponsive = this.handleOpenModalResponsive.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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

  handleOpenModal(id) {
    this.setState({ showModal: true });

  }

  getOrder(id) {

    console.log("Made it to history")
    console.log(id)

    getOrderById(this.props.dispatch, id)

    setTimeout(() => {
      if (this.props.oneOrder) {
        this.handleOpenModal();
      }
    }, 500)

  }

  getOrderResponsive(id) {

    console.log("Made it to history")
    console.log(id)

    getOrderById(this.props.dispatch, id)

    setTimeout(() => {
      if (this.props.oneOrder) {
        this.handleOpenModalResponsive();
      }
    }, 500)

  }

  handleOpenModalResponsive() {
    this.setState({ showModalResponsive: true });
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
      showModalResponsive: false,
      showModalConfirm: false
    });
  }

  handleOpenModalConfirm(id) {
    this.setState({
      showModalConfirm: true,
      cancelOrder: id
    });

  }

  changeInputs = e => { this.setState({ [e.target.name]: e.target.value }) }

  cancelOrder() {

    console.log(this.state.cancelOrder)

    let instructions = {
      startVal: this.state.startVal,
      viewAmt: this.state.viewAmt,
      userId: this.props.userId.customerId
    }

    console.log(this.state.showModalConfirm)


    cancelOrder(this.props.dispatch, this.state.cancelOrder, instructions)
    this.handleCloseModal()

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

        {/* STANDARD */}
        <MediaQuery query="(min-device-width: 600px)">
          <table className="order-list">

            {this.props.orderList.map((b) =>
              <OrderDetails key={b.id} ord={b}
                cancelOrder={this.handleOpenModalConfirm.bind(this)}
                getOrder={this.getOrder.bind(this)} />)}
          </table>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Shopping Cart"
            className="modal-content-order"
            shouldCloseOnOverlayClick={true}
            overlayClassName="modal-overlay">
            {this.props.oneOrder ?
              <OneOrder key={this.props.oneOrder.id} ord={this.props.oneOrder} /> : ""}
            <div className="close-order-popup">
              <button onClick={this.handleCloseModal} className="close-popup"> CLOSE </button>
            </div>

          </ReactModal>
        </MediaQuery>

        {/* RESPONSIVE */}
        <MediaQuery query="(max-device-width: 600px)">
          <table className="order-list-narrow">
            {this.props.orderList.map((b) =>
              <OrderDetails key={b.id} ord={b}
                cancelOrder={this.handleOpenModalConfirm.bind(this)}
                getOrder={this.getOrderResponsive.bind(this)} />)}
          </table>

          <ReactModal
            isOpen={this.state.showModalResponsive}
            contentLabel="Shopping Cart"
            className="modal-content-responsive-order"
            shouldCloseOnOverlayClick={true}
            overlayClassName="modal-overlay">

            {this.props.oneOrder ?
              <OneOrder key={this.props.oneOrder.id} ord={this.props.oneOrder} /> : ""}
            <div className="close-order-popup">
              <button onClick={this.handleCloseModal} className="close-popup"> CLOSE </button>
            </div>

          </ReactModal>
        </MediaQuery>

        <ReactModal
          isOpen={this.state.showModalConfirm}
          contentLabel="Confirm Delete"
          className="modal-content-addtocart"
          overlayClassName="modal-overlay">
          <div className="cancel-confirm">
            Are you sure you want to cancel this order?
            <br />
            <button className="confirm-button" onClick={this.cancelOrder.bind(this)}>CONFIRM</button>
            <button className="cancel-button" onClick={this.handleCloseModal}>CANCEL</button>

          </div>
        </ReactModal>

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
    orderCount: store.orderCount,

    oneOrder: store.oneOrder
  })
)(OrderHistory);