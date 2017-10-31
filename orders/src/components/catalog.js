import React, { Component } from 'react'
import { connect } from "react-redux"
import InfiniteScroll from 'react-infinite-scroll-component'
import '../App.css'
import { getProducts, getProductCount, viewProduct } from "../dispatcher/actions"
import Product from './product'
import Sidebar from './sidebar'
import ProductDetails from './productdetails'
import { withRouter } from 'react-router-dom'
import Pagination from 'react-js-pagination'

class Catalog extends Component {
  constructor() {
    super();
    this.state = {
      //Paging
      moreProds: true,
      startVal: 0,
      viewAmt: 10,
      activePage: 1,
      productView: false,
      checkOut: false
      
    };
    this.getMoreProducts = this.getMoreProducts.bind(this);
    this.seeProduct = this.seeProduct.bind(this);
    this.returnToCatalog = this.returnToCatalog.bind(this);
    
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

  refresh() { }

  getMoreProducts(pageNumber) {

    console.log(pageNumber)

    //Establish records to pull
    var start = this.state.startVal
    var view = this.state.viewAmt

    this.setState({ activePage: pageNumber })

    if (pageNumber === 1){
      start = 0

      let instructions = {
        viewAmt: this.state.viewAmt,
        startVal: start + view,
        userid: this.props.userid
      }

      this.setState(instructions)

      getProducts(this.props.dispatch, instructions)
      
      
    }

    if (pageNumber > this.state.activePage)
    {
      start = pageNumber * view

      let instructions = {
        viewAmt: this.state.viewAmt,
        startVal: start,
        userid: this.props.userid
      }

      this.setState(instructions)   
      
      getProducts(this.props.dispatch, instructions)
    
    }

    /*
    //If exceed # of records pulled, stop scrolling
    if (this.props.productCount === this.props.productList.length) {
      this.setState({ moreProds: false })
    }
    //Send instructions:
        */

  }

  seeProduct(product) {
    this.setState({
        productView: true,
        product: product
    })

    viewProduct(this.props.dispatch, product)
}

returnToCatalog(e){
  this.setState({
    productView: false,
})}

  render() {

    let i = 0

    console.log('In RENDER:')    
    console.log(this.state.productView)
    
    if(this.state.productView)
    {
      return (
        <ProductDetails
        prod={this.props.productDetails}
        returnToCatalog={this.returnToCatalog}/>
      )
    }
    if(this.props.cartView)
    {
      return (
        "Checkout"
      )
    }
      else
      {
        return (
      <div className="catalog-container">
      <div className="catalog-title">
        <div className="product-list">
          {this.props.productList.map((b) =>
            <Product key={b.id} prod={b} seeProduct={this.seeProduct}/>)}
         </div>
              <nav className="pgs-nav">
              <Pagination
              innerClass="pgs-outer"
              itemClass="pgs-inner"
              activeClass="pgs-active"
              activePage={this.state.activePage}
              itemsCountPerPage={10}
              hideNavigation={true}
              totalItemsCount={Math.ceil(this.props.productCount)}
              pageRangeDisplayed={5}
              onChange={this.getMoreProducts.bind(this)}
               />
            </nav>
      </div>
      </div>
    )}
  }// end render
}//end component

export default withRouter(connect(
  store => ({
    userid: store.userid,
    productList: store.productList,
    productCount: store.productCount,
    shoppingCart: store.shoppingCart,
    productDetails: store.productDetails,
    cartView: store.cartView
  })
)(Catalog));

//TO DO
//-- UPDATE QUANTITY IN CART

