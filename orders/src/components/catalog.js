import React, { Component } from 'react'
import { connect } from "react-redux"
import InfiniteScroll from 'react-infinite-scroll-component'
import '../App.css'
import { getOrders, getProducts, getCount } from "../dispatcher/actions"
import Product from './product'

const style = {
  display: 'flex',
  alignItems: 'center',
  fontSize: 40
};

const divs = [
  <div key={1} style={{ height: 200, background: '#9bc95b', ...style }}>Div no 1</div>,
  <div key={2} style={{ height: 200, background: '#ffd47b', ...style }}>Div no 2</div>,
  <div key={3} style={{ height: 200, background: '#95a9d6', ...style }}>Div no 3</div>,
  <div key={4} style={{ height: 200, background: '#ffa8e1', ...style }}>Div no 4</div>,
  <div key={5} style={{ height: 200, background: '#9bc95b', ...style }}>Div no 5</div>,
  <div key={6} style={{ height: 200, background: '#ffd47b', ...style }}>Div no 6</div>,
  <div key={7} style={{ height: 200, background: '#95a9d6', ...style }}>Div no 7</div>,
  <div key={8} style={{ height: 200, background: '#ffa8e1', ...style }}>Div no 8</div>,
];


class Catalog extends Component {
  constructor() {
    super();
    this.state = {
      divs: divs,

      //Paging
      moreProds: true,
      startVal: 0,
      viewAmt: 10,

      //Filter/Product selection
      filter: "all"

    };
    this.generateDivs = this.generateDivs.bind(this);
    this.getMoreProducts = this.getMoreProducts.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    let instructions = {
      viewAmt: this.state.viewAmt,
      startVal: this.state.startVal,
      userid: this.props.userid
    }
    console.log(instructions)
    getProducts(this.props.dispatch, instructions)
    getCount(this.props.dispatch, instructions)


  }

  changeInputs = e => { this.setState({ [e.target.name]: e.target.value }) }

  //Get rid of this when you're sure your infinite scrolling works
  generateDivs() {
    let moreDivs = [];
    let count = this.state.divs.length;
    for (let i = 0; i < 30; i++) {
      moreDivs.push(
        <div key={'div' + count++}>
          Div no {count}
        </div>
      );
    }
  }

  //-------------------------------------------------------------

  refresh() {
  }

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

    console.log("Insructions: " + start + ", " + view)

    this.setState(instructions)

    //If exceed # of records pulled, stop scrolling
    if (this.props.productCount === this.props.productList.length) {
      this.setState({ moreProds: false })
    }
    //Send instructions:
    getProducts(this.props.dispatch, instructions)

  }

  render() {
    console.log("Product count: " + this.props.productCount)
    console.log("Product list count: " + this.props.productList.length)

    console.log(this.props.productList)

    return (
      <div className="catalog-title">

        <h1>Catalog</h1>
        <div className="product-list">
        <InfiniteScroll
          refreshFunction={this.refresh}
          next={this.getMoreProducts.bind(this)}
          hasMore={this.state.moreProds} >
          
          {this.props.productList.map((b) =>
                            <Product
                                key={b.Id + b.Name + b.Price}
                                prod={b} />)}


        </InfiniteScroll>
        </div>
      </div>
    )
  }// end render
}//end component

export default connect(
  store => ({
    productList: store.productList,
    userid: store.userid,
    productCount: store.productCount,
    shoppingCart: store.shoppingCart
  })
)(Catalog);
