import React, { Component } from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import '../App.css'
import { getOrders } from "../dispatcher/actions"

const style = {
    display: 'flex',
    alignItems: 'center',
    fontSize: 40
  };
  
  const divs = [
    <div key={1} style={{height: 200, background: '#9bc95b', ...style}}>Div no 1</div>,
    <div key={2} style={{height: 200, background: '#ffd47b', ...style}}>Div no 2</div>,
    <div key={3} style={{height: 200, background: '#95a9d6', ...style}}>Div no 3</div>,
    <div key={4} style={{height: 200, background: '#ffa8e1', ...style}}>Div no 4</div>,
    <div key={5} style={{height: 200, background: '#9bc95b', ...style}}>Div no 5</div>,
    <div key={6} style={{height: 200, background: '#ffd47b', ...style}}>Div no 6</div>,
    <div key={7} style={{height: 200, background: '#95a9d6', ...style}}>Div no 7</div>,
    <div key={8} style={{height: 200, background: '#ffa8e1', ...style}}>Div no 8</div>,
  ];


class OrderInfo extends Component {
    constructor () {
        super();
        this.state = {
          divs: divs,

        //Paging
        moreOrds: true,
        startVal: 0,
        viewAmt: 10,

        //Filter/Product selection
        filter: "all"

        };
        this.generateDivs = this.generateDivs.bind(this);
        this.getMoreOrders = this.getMoreOrders.bind(this);
        this.refresh = this.refresh.bind(this);
      }

      componentDidMount() {

    }

    changeInputs = e => { this.setState({ [e.target.name]: e.target.value }) }

    //Get rid of this when you're sure your infinite scrolling works
    generateDivs () {
        let moreDivs = [];
        let count = this.state.divs.length;
        for (let i = 0; i < 30; i++) {
          moreDivs.push(
            <div key={'div' + count++}>
              Div no {count}
            </div>
          );
        }
        setTimeout(() => {
          this.setState({divs: this.state.divs.concat(moreDivs)});
        }, 500);
      }
    
     //-------------------------------------------------------------

      refresh () {
        this.setState({divs: []});
        setTimeout(() => {
          this.setState({divs});
        }, 3000);
      }

      getMoreOrders(){

        //Establish records to pull
        var start = this.state.startVal
        var view = this.state.viewAmt

        //Ready instructions: viewAmt, startVal, userId
        let instructions = {
            viewAmt: this.state.viewAmt,
            startVal: start + view,
            userid: this.props.userid
        }

        //If exceed # of records pulled, stop scrolling
        if (this.props.recordCount === this.props.orderList) {
            this.setState({ moreOrds: false })
        }

        //Send instructions:
        getOrders(this.props.dispatch, instructions)
      }


render() {
    
    return (
        <div className="catalog-title">

        <h1>Catalog</h1>
        <InfiniteScroll
          pullDownToRefresh
          pullDownToRefreshContent={<h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>}
          releaseToRefreshContent={<h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>}
          refreshFunction={this.refresh}
          next={this.getMoreOrders.bind(this)}
          hasMore={this.state.moreOrds}
          >
          {this.props.productList.map((b) =>
          <Product />)}
        </InfiniteScroll>
      </div>
    )
}// end render
}//end component

export default connect(
    store => ({
        orderList: store.orderList,
        userid: store.userid,
        recordCount: store.recordCount,
    })
)(Catalog);
