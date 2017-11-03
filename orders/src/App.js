import React, { Component } from 'react';
import Header from './components/header';
import Divider from './components/divider';
import Footer from './components/footer';
import Catalog from './components/catalog'
import OrderHistory from './components/orderhistory'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      catalog: true,
      orders: false
    }
    this.displayCatalog = this.displayCatalog.bind(this)
    this.displayOrders = this.displayOrders.bind(this)
  }

  displayCatalog(e) {
    this.setState({
      catalog: !this.state.catalog,
      orders: false
    })

    //console.log("Display catalog: " + this.state.catalog)

  }

  displayOrders(e) {
    this.setState({
      orders: !this.state.orders,
      catalog: false
    })

    //console.log("Display orders: " + this.state.orders)

  }


  render() {

    if (this.state.catalog) {
      return (
        <div className="App">
          <Header
            displayCatalog={this.displayCatalog.bind(this)}
            displayOrders={this.displayOrders.bind(this)}
          />
          <Divider />
          <Catalog />
          <Footer />
        </div>
      )
    }
    if (this.state.orders) {
      return (
        <div className="App">
          <Header
            displayCatalog={this.displayCatalog.bind(this)}
            displayOrders={this.displayOrders.bind(this)}
          />
          <Divider />
          <OrderHistory />
          <Footer />
        </div>
      )
        }
        else {
          return (
            <div className="App">
              <Header
                displayCatalog={this.displayCatalog.bind(this)}
                displayOrders={this.displayOrders.bind(this)}
              />
              <Divider />
              <Catalog />
              <Footer />
            </div>
          )
        }
  }
}
