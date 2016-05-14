'use strict';

import React             from 'react';
import Reflux            from 'reflux';
import {Link}            from 'react-router';
import DocumentTitle     from 'react-document-title';
import Character         from '../components/Character';
import Hammer            from 'react-hammerjs';
import CharacterActions  from '../actions/CharacterActions';

const propTypes = { };

class ComicsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      loadset: 1
    }
  }

  showMore(){
    this.setState({ loadset: this.state.loadset +1 })
    CharacterActions.fetchList(this.state.loadset);
    this.charactersSet = false;
  }

  updateCharacters(){
    this.charactersSet = true;
    this.setState({ characters:this.props.characters });
  }

  componentDidMount() {
    this.charactersSet = false;
    if((this.props.characters.length>0)&&(!this.charactersSet))
      this.updateCharacters();
  }

  componentDidUpdate(){
    console.log('Characters page updated, ', this.props, this.state);
    if((this.props.characters.length > 0)&&(!this.charactersSet))
      this.updateCharacters();
  }

  render() {
    return (
      <DocumentTitle title='MARVEL : Characters'>
        <section className="character-page content-page">
            
          {
            this.state.characters.map(function(char, i) {
            return <div key={i}>
                        <Character 
                          name = {char.name}
                          desc = {char.description} 
                          url = {char.urls && char.urls[0] && char.urls[0].url}
                          img = {char.thumbnail && char.thumbnail.path}
                          imgext = {char.thumbnail && char.thumbnail.extension}
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