'use strict';

import React             from 'react';
import Reflux            from 'reflux';
import {Link}            from 'react-router';
import DocumentTitle     from 'react-document-title';
import Creator           from '../components/Creator';
import Hammer            from 'react-hammerjs';
import CreatorActions    from '../actions/CreatorActions';

const propTypes = { };

class CreatorPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      creators: [],
      loadset: 1
    }
  }

  updateComics(){
    this.creatorSet = true;
    this.setState({ creators:this.props.creators });
  }

  showMore(){
    this.setState({ loadset: this.state.loadset +1 })
    CreatorActions.fetchList(this.state.loadset);
    this.creatorSet = false;
  }

  componentDidMount() {
    this.creatorSet = false;
    if((this.props.creators.length > 0)&&(!this.creatorSet))
      this.updateComics();
  }

  componentDidUpdate(){
    console.log('creator page updated, ', this.props, this.state);
    if((this.props.creators.length > 0)&&(!this.creatorSet))
      this.updateComics();
  }

  render() {
    return (
      <DocumentTitle title='MARVEL : Creators'>
        <section className="creator-page content-page">
            
          {
            this.state.creators.map(function(creator, i) {
            return <div key={i}>
                        <Creator 
                          title = {creator.fullName}
                          url = {creator.urls && creator.urls[0] && creator.urls[0].url}
                          img = {creator.thumbnail && creator.thumbnail.path}
                          imgext = {creator.thumbnail && creator.thumbnail.extension}
                          id={i}  />
                    </div>;
            }.bind(this))
          }
          
          <Hammer onTap={ this.showMore.bind(this) }>
            <div className='more'>Show More + </div>
          </Hammer>

        </section>
      </DocumentTitle>
    );
  }

}

CreatorPage.propTypes = propTypes;

export default CreatorPage;