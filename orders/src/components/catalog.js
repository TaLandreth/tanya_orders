import React, { Component } from 'react'
import { connect } from "react-redux"
import '../App.css'
import { getProducts, getProductCount, viewProduct } from "../dispatcher/actions"
import Product from './product'
import ProductDetails from './productdetails'
import { withRouter } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import MediaQuery from 'react-responsive'


class Catalog extends Component {
  constructor() {
    super();
    this.state = {
      //Paging
      moreProds: true,
      startVal: 0,
      viewAmt: 6,
      activePage: 1,
      productView: false,
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.getMoreProducts = this.getMoreProducts.bind(this);
    this.seeProduct = this.seeProduct.bind(this);
    this.returnToCatalog = this.returnToCatalog.bind(this);

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    if (this.state.width > 800) {
      console.log("Larger than 800")

      let instructions = {
        viewAmt: 8,
        startVal: this.state.startVal,
      }

      this.setState(instructions)

      console.log(instructions)
      getProducts(this.props.dispatch, instructions)
      getProductCount(this.props.dispatch, instructions)

      console.log("Width: " + this.state.width)
      console.log("Height: " + this.state.height)
    }

    if (this.state.width < 800) {
      console.log("Smaller than 800")

      let instructions = {
        viewAmt: 6,
        startVal: this.state.startVal,
      }

      this.setState(instructions)

      console.log(instructions)
      getProducts(this.props.dispatch, instructions)
      getProductCount(this.props.dispatch, instructions)

      console.log("Width: " + this.state.width)
      console.log("Height: " + this.state.height)
    }


  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  changeInputs = e => { this.setState({ [e.target.name]: e.target.value }) }

  refresh() { }

  getMoreProducts(pageNumber) {

    var start = this.state.startVal
    var view = this.state.viewAmt

      start = (pageNumber - 1) * (view)

      let instructions = {
        viewAmt: this.state.viewAmt,
        startVal: start,
      }

      if (this.state.width > 800) {
        console.log("Larger than 800")

        instructions.viewAmt = 8
      }

      else {
        instructions.viewAmt = 6
      }

      this.setState(instructions)

      console.log(instructions)

      this.setState({ activePage: pageNumber })
      getProducts(this.props.dispatch, instructions)

      console.log("Start/View AFTER PG" + start + ", " + view)

  }

  seeProduct(product) {
    this.setState({
      productView: true,
    })

    viewProduct(this.props.dispatch, product)
  }

  returnToCatalog(e) {
    this.setState({
      productView: false,
    })

  }

  render() {

    if (this.state.productView) {
      return (
        <ProductDetails
          prod={this.props.productDetails}
          returnToCatalog={this.returnToCatalog} />
      )
    }
    else {
      return (
        <div className="catalog-container">
          <div className="catalog-title">

            <MediaQuery query="(max-device-width: 600px)">
              <div className="product-list-narrow">
                {this.props.productList.map((b) =>
                  <Product key={b.id} prod={b} seeProduct={this.seeProduct} />)}
              </div>
            </MediaQuery>

            <MediaQuery query="(min-device-width: 600px)">
              <div className="product-list">
                {this.props.productList.map((b) =>
                  <Product key={b.id} prod={b} seeProduct={this.seeProduct} />)}
              </div>
            </MediaQuery>
            <nav className="pgs-nav">
              <Pagination
                innerClass="pgs-outer"
                itemClass="pgs-inner"
                activeClass="pgs-active"
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.viewAmt}
                hideNavigation={true}
                totalItemsCount={this.props.productCount}
                onChange={this.getMoreProducts.bind(this)}
              />
            </nav>
          </div>
        </div>
      )
    }
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

