import React, { Component } from 'react';
import { connect } from "react-redux"
import Header from './components/header';
import Divider from './components/divider';
import Footer from './components/footer';
import Catalog from './components/catalog'
import OrderHistory from './components/orderhistory'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      catalog: true,
      orders: false,
      catalogProduct: false
    }
    this.displayCatalog = this.displayCatalog.bind(this)
    this.displayOrders = this.displayOrders.bind(this)    
  }

  displayCatalog(e) {
    this.setState({
      catalog: true,
      orders: false,
      catalogProduct: !this.state.catalogProduct
    })
  }

  displayOrders(e) {
    this.setState({
      orders: true,
      catalog: false
    })
  }


  render() {

    if (this.props.catalogView) {
      return (
        <div className="App">
          <Header />
          <Divider />
          <Catalog />
          <Footer />
        </div>
      )
    }
    if (this.props.ordersView) {
      return (
        <div className="App">
          <Header />
          <Divider />
          <OrderHistory />
          <Footer />
        </div>
      )
        }
        else {
          return (
            <div className="App">
              <Header />
              <Divider />
              <Catalog />
              <Footer />
            </div>
          )
        }
  }
}

export default connect(
  store => ({
      catalogView: store.catalogView,
      ordersView: store.ordersView
  })
)(App);
