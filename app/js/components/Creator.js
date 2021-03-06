'use strict';

import React      from 'react';
import ReactDom   from 'react-dom';

class Creator extends React.Component{

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
      <div className='comic' ref='el'>
          <div className='thumbnail' ref='thumb'><img ref='img' src={ this.props.img + '/standard_large.' +this.props.imgext } /></div>
          <div className='info half'>
            <div className='title'>{ this.props.title }</div>
            <div className='link'><a href={ this.props.url } target='_blank'>More info <img src='/images/ico-arrow.svg'/></a></div>
          </div>
      </div>
    );
  }

}

export default Creator;