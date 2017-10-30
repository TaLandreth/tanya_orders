import React, { Component } from 'react'
import { connect } from "react-redux"
import InfiniteScroll from 'react-infinite-scroll-component'
import '../App.css'
import { getProducts, getProductCount } from "../dispatcher/actions"
import Product from './product'
import { withRouter } from 'react-router-dom'

class Catalog extends Component {
  constructor() {
    super();
    this.state = {
      //Paging
      moreProds: true,
      startVal: 0,
      viewAmt: 10,
      //Filter/Product selection
      filter: "all"
    };
    this.getMoreProducts = this.getMoreProducts.bind(this);
  }

  componentDidMount() {
    let instructions = {
      viewAmt: this.state.viewAmt,
      startVal: this.state.startVal,
      userid: this.props.userid
    }
    //console.log(instructions)
    getProducts(this.props.dispatch, instructions)
    getProductCount(this.props.dispatch, instructions)
  }

  changeInputs = e => { this.setState({ [e.target.name]: e.target.value }) }

  refresh() {}

  getMoreProducts() {
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
    if (this.props.productCount === this.props.productList.length) {
      this.setState({ moreProds: false })
    }
    //Send instructions:
    getProducts(this.props.dispatch, instructions)
  }

  render() {
    //console.log("Product count: " + this.props.productCount)
    //console.log("Product list count: " + this.props.productList.length)
    //console.log(this.props.productList)

    let i = 0

    return (
      <div className="catalog-title">
        <h1>Catalog</h1>
        <div className="product-list">
        <InfiniteScroll
          refreshFunction={this.refresh}
          next={this.getMoreProducts.bind(this)}
          hasMore={this.state.moreProds} >
          {this.props.productList.map((b) => <Product key={this.props.productCount.length + i++} prod={b} />)}
        </InfiniteScroll>
        </div>
      </div>
    )
  }// end render
}//end component

export default withRouter(connect(
  store => ({
    productList: store.productList,
    userid: store.userid,
    productCount: store.productCount,
    shoppingCart: store.shoppingCart
  })
)(Catalog));

//TO DO
//-- UPDATE QUANTITY IN CART
//