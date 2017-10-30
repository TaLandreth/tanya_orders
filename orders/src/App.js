import React, { Component } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Catalog from './components/catalog'
import Orders from './components/orders'
import Login from './components/login'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header
          user={this.props.userId} />
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/orders" component={Orders} />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(
  store => ({
    orderList: store.orderList,
    productList: store.productList,
    userid: store.userid,
    shoppingCart: store.shoppingCart
  })
)(App));
