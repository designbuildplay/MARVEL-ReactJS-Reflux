'use strict';

import React             from 'react';
import Reflux            from 'reflux';
import {Link}            from 'react-router';
import DocumentTitle     from 'react-document-title';

const propTypes = { };

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DocumentTitle title='Welcome to Marvel App'>
        <section className="home-page">
          
          <div className='into-logo'><img src='images/marvel-logo.png'/></div>  
          <div className='into-info'>A Marvel API demo built with:<br/> React | Reflux | SASS | Gulp</div>
        </section>
      </DocumentTitle>
    );
  }

}

HomePage.propTypes = propTypes;

export default HomePage;