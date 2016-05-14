'use strict';

import React from 'react';
import ReactDom   from 'react-dom';

class Comic extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.el = ReactDom.findDOMNode(this.refs.el);

    if(this.props.img === undefined)
        this.el.style.display = 'none';
  }

  componentDidUpdate(){
      
      if(this.props.img === undefined)
        this.el.style.display = 'none';

  }

  render() {
    return (
      <div className='comic'>
          <div className='thumbnail' ref='thumb'><img src={ this.props.img + '/portrait_fantastic.' +this.props.imgext } /></div>
          <div className='info'>
            <div className='title'>{ this.props.name }</div>
            <div className='description'>{ this.props.desc }</div>
            <div className='link'><a href={ this.props.url } target='_blank'>More info <img src='/images/ico-arrow.svg'/></a></div>
          </div>
      </div>
    );
  }

}

export default Comic;