import React, { Component } from 'react';
import Header from './components/header';
import Divider from './components/divider';
import Footer from './components/footer';
import Catalog from './components/catalog'
//import Orders from './components/orders'
import Login from './components/login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header user={this.props.userId} />
          <Divider />
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/catalog" component={Catalog} />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}
