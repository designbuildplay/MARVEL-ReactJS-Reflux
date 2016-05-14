'use strict';

import React                   from 'react';
import ReactDom                from 'react-dom';
import { Router, Route, Link } from 'react-router'
import Hammer                  from 'react-hammerjs';

const propTypes = {};
const contextTypes = {};

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  shouldHide() {
    if(this.props.hideHeader){
      this.header.classList.add('hide');
    }else{
      this.header.classList.remove('hide');
    }
  }

  openNav(open){
    /**
     * Slide the page content to open draw-panel
     */
    if(open){
      this.header.classList.add('slide');
    }else{
      this.header.classList.remove('slide');
    }
  }

  componentDidUpdate() {
    

    this.shouldHide();
  }

  componentDidMount() {
    this.burger = ReactDom.findDOMNode(this.refs.burger);
    this.header = ReactDom.findDOMNode(this.refs.header);
  }

  render() {
    return (
      <header ref="header" id='header'>
          <div className="ico-nav ">
              <button className="hamburger hamburger--elastic" ref='burger' type="button">
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>  
              <div className='close'><img src='/images/close.svg' /></div>    
          </div>
      </header>
    );
  }

}

Header.contextTypes = contextTypes;
Header.propTypes = propTypes;

export default Header;