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

    if (this.state.catalog) {
      return (
        <div className="App">
          <Header
            displayCatalog={this.displayCatalog.bind(this)}
            displayOrders={this.displayOrders.bind(this)}
          />
          <Divider />
          <Catalog 
          view={this.state.catalog} />
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
              <Catalog view={this.state.catalog}/>
              <Footer />
            </div>
          )
        }
  }
}
