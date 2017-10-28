import React, { Component } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Catalog from './components/catalog'
import Login from './components/login'
import { Switch, Route } from 'react-router-dom'

import { connect } from "react-redux"

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
      <Header 
      cart={this.props.shoppingCart}
      user={this.props.userId}/>
      <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/catalog' component={Catalog} />
      </Switch>
        <Footer />
      </div>
    );
  }
}

export default connect(
  store => ({
      orderList: store.orderList,
      productList: store.productList,
      userid: store.userid,
      recordCount: store.recordCount,
      shoppingCart: store.shoppingCart
  })
)(App);
