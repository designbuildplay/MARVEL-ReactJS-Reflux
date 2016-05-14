'use strict';

import React             from 'react';
import Reflux            from 'reflux';
import {Link}            from 'react-router';
import DocumentTitle     from 'react-document-title';
import Comic             from '../components/Comic';
import Hammer            from 'react-hammerjs';
import ComicActions      from '../actions/ComicActions';


const propTypes = { };

class ComicsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comics: [],
      loadset: 1
    }
  }

  updateComics(){
    this.comicsSet = true;
    this.setState({ comics:this.props.comics }); 
  }

  showMore(){
    this.setState({ loadset: this.state.loadset +1 })
    ComicActions.fetchList(this.state.loadset);
    this.comicsSet = false;
  }

  componentDidMount() {
    this.comicsSet = false;
    // console.log('Comics page mout, ', this.props, this.state);

    if((this.props.comics.length > 0)&&(!this.comicsSet))
      this.updateComics();
  }

  componentDidUpdate(){
    if((this.props.comics.length > 0)&&(!this.comicsSet))
      this.updateComics();
  }

  render() {
    return (
      <DocumentTitle title='MARVEL : Comics'>
        <section className="comic-page content-page">
            
          {
            this.state.comics.map(function(comic, i) {
            return <div key={i}>
                        <Comic 
                          title = {comic.title}
                          series = {comic.series && comic.series.name }
                          desc = {comic.description} 
                          url = {comic.urls && comic.urls[0] && comic.urls[0].url}
                          img = {comic.images && comic.images[0] && comic.images[0].path}
                          imgext = {comic.images && comic.images[0] && comic.images[0].extension}
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

ComicsPage.propTypes = propTypes;

export default ComicsPage;