import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import { getProducts, getProductCount, viewProduct } from "../dispatcher/actions"
import Product from './product'
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
      viewAmt: 6,
      activePage: 1,
      productView: false      
    };
    this.getMoreProducts = this.getMoreProducts.bind(this);
    this.seeProduct = this.seeProduct.bind(this);
    this.returnToCatalog = this.returnToCatalog.bind(this);
    
  }

  componentDidMount() {
    let instructions = {
      viewAmt: this.state.viewAmt,
      startVal: this.state.startVal,
    }
    //console.log(instructions)
    getProducts(this.props.dispatch, instructions)
    getProductCount(this.props.dispatch, instructions)
  }

  changeInputs = e => { this.setState({ [e.target.name]: e.target.value }) }

  refresh() { }

  getMoreProducts(pageNumber) {

    console.log("how many products?" + this.props.productCount.count)
    console.log("Page Number:" + pageNumber)
  
    //Establish records to pull
    var start = this.state.startVal
    var view = this.state.viewAmt

    console.log("Start/View Amt on click" + start + ", " + view)    

    if (pageNumber === 1){
      start = 0

      let instructions = {
        viewAmt: this.state.viewAmt,
        startVal: start + view,
      }

      this.setState(instructions)
      this.setState({ activePage: pageNumber })
      

      getProducts(this.props.dispatch, instructions)
      
      console.log("Start/View AFTER PG" + start + ", " + view)    
      
      
    }

    if (pageNumber > this.state.activePage)
    {
      console.log("Page Number:" + pageNumber)

      console.log("Start/View Amt on click" + start + ", " + view)    
      
      start = pageNumber * view

      let instructions = {
        viewAmt: this.state.viewAmt,
        startVal: start,
      }

      this.setState(instructions)
      this.setState({ activePage: pageNumber })
      
      
      getProducts(this.props.dispatch, instructions)

      console.log("Start/View AFTER PG" + start + ", " + view)    
      
    
    }

    if (pageNumber < this.state.activePage)
    {

      console.log("Page Number:" + pageNumber)
      
      console.log("Start/View Amt on click" + start + ", " + view)  

      start = (start + view) - (pageNumber * view)

      let instructions = {
        viewAmt: this.state.viewAmt,
        startVal: start,
      }

      this.setState(instructions)   
      this.setState({ activePage: pageNumber })      
      
      getProducts(this.props.dispatch, instructions)

      console.log("Start/View AFTER PG" + start + ", " + view)     
    
    }

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

    let pager = Math.ceil(this.props.productCount)

    if(this.state.productView)
    {
      return (
        <ProductDetails
        prod={this.props.productDetails}
        returnToCatalog={this.returnToCatalog}/>
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
              itemsCountPerPage={6}
              hideNavigation={true}
              pageRangeDisplayed={10}
              totalItemsCount={pager}
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

