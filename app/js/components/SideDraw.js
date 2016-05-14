'use strict';

import React                   from 'react';
import ReactDom                from 'react-dom';
import { Router, Route, Link } from 'react-router';
import Hammer                  from 'react-hammerjs';

const propTypes = {

};

const contextTypes = {

};

class SideDraw extends React.Component {

  constructor(props) {
    super(props);
    this.state = { subtitle:''}
  }

  componentDidMount(){
    this.sidedraw = ReactDom.findDOMNode(this.refs.sidedraw);
    this.navdraw = ReactDom.findDOMNode(this.refs.navdraw);

  }


  openNav(open){
    /**
     * Slide the page content to open draw-panel
     * @param  {[type]} this.state.navOpen [description]
     */
    if(open){
      this.sidedraw.classList.add('open');
    }else{
      this.sidedraw.classList.remove('open');
    }
  }

  onCloseSub(){
    this.navdraw.classList.remove('hide');
    this.subdraw.classList.remove('show');
  }

  onPageChange(page) {
    this.props.navOpen();
  }

  onChangeSearch() {
    this.props.navToggle(false);
  }

  render() {
    return (
      <div className="side-draw" id='side-draw' ref="sidedraw">
          <div className="side-header"></div>
          
          <div className='navdraw' ref='navdraw'>
              <Hammer onTap={ this.onPageChange.bind(this, 'home') }>
                <Link to="/"><div className='head'><img src='/images/marvel-heroes.jpg' /></div></Link>
              </Hammer>
              <ul className='nav'>
              <Hammer onTap={ this.onPageChange.bind(this, 'comics') }>
                    <Link to="/comics"><li>View Comics <img src='/images/ico-arrow.svg'/></li></Link>
              </Hammer>
               <Hammer onTap={ this.onPageChange.bind(this, 'characters') }>
                  <Link to="/characters"><li>View Characters <img src='/images/ico-arrow.svg'/></li></Link>
              </Hammer>
               <Hammer onTap={ this.onPageChange.bind(this, 'creators') }>
                  <Link to="/creators"><li className='borderbtm'>View Creators <img src='/images/ico-arrow.svg'/></li></Link>
              </Hammer>
              </ul>
           
              <div className='legal'>
               created by Josh Freeman <a href='mailto:info@designbuildplay.io'>info@designbuildplay.io</a>
              </div>
          </div>

      </div>
    );
  }

}

SideDraw.contextTypes = contextTypes;
SideDraw.propTypes = propTypes;

export default SideDraw;