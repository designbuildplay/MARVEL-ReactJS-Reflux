'use strict';

import React             from 'react';
import ReactDom          from 'react-dom';
import Reflux            from 'reflux';
import ComicActions      from './actions/ComicActions';
import ComicStore        from './stores/ComicStore';
import CharacterActions  from './actions/CharacterActions';
import CharacterStore    from './stores/CharacterStore';
import CreatorActions    from './actions/CreatorActions';
import CreatorStore      from './stores/CreatorStore';
import Header            from './components/Header';
import SideDraw          from './components/SideDraw';
import Hammer            from 'react-hammerjs';
import classList         from 'classlist-polyfill';

const propTypes = {
  params: React.PropTypes.object,
  query: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]),
};

class App extends React.Component {

  constructor(props) {
    super(props);

    this.onComicStoreUpdate = this.onComicStoreUpdate.bind(this);
    this.onCharacterStoreUpdate = this.onCharacterStoreUpdate.bind(this);
    this.onCreatorStoreUpdate = this.onCreatorStoreUpdate.bind(this);
    this.state = {
      comics:[],
      characters:[],
      creators:[]
    };
  }
  
  onComicStoreUpdate(data) {
    this.setState({
      comics:this.state.comics.concat(data.data.results)
    });
  }

  onCharacterStoreUpdate(data) {
    this.setState({
      characters:this.state.characters.concat(data.data.results)
    });
  }

  onCreatorStoreUpdate(data) {
    this.setState({
      creators:this.state.creators.concat(data.data.results)
    });
  }

  componentDidMount() {

    this.unsubscribe = ComicStore.listen(this.onComicStoreUpdate);
    this.unsubscribeCharacter = CharacterStore.listen(this.onCharacterStoreUpdate);
    this.unsubscribeCreator = CreatorStore.listen(this.onCreatorStoreUpdate);

    this.page = ReactDom.findDOMNode(this.refs.pages);

    ComicActions.fetchList();
    CharacterActions.fetchList();
    CreatorActions.fetchList();
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.unsubscribeCharacter();
    this.unsubscribeCreator();
  }

  componentDidUpdate() {
    
  }

  renderChildren() {
    return React.cloneElement(this.props.children, {
      params: this.props.params,
      query: this.props.query,
      text: this.state.text,
      comics: this.state.comics,
      characters: this.state.characters,
      creators: this.state.creators
    });
  }

  navOpen(){

    if(!this.navOpenState){
      this.navOpenState = true;
      this.page.classList.add('slide');
      this.refs['navControl'].style.width = '100%';
   }else{
     this.navOpenState = false;
     this.page.classList.remove('slide');
     this.refs['navControl'].style.width = '30%';
   }

   this.refs['SideDraw'].openNav(this.navOpenState);
   this.refs['header'].openNav(this.navOpenState);

  }

  handleSwipe(e) {
    switch(e.direction){
      case 2:
        this.navOpenState = true;
        this.navOpen();
      break;
      case 4:
        this.navOpenState = false;
        this.navOpen();
      break;
    }
  }

  render() {
    return (
      <div className="app">

        <Hammer onSwipe={this.handleSwipe.bind(this)}>
          <SideDraw ref='SideDraw' 
              history={ this.props.history }
              text= {this.state.text}
              navOpen={this.navOpen.bind(this)} 
              changeLocation={this.state.changeLocation}
              />
        </Hammer>
        
        <Hammer onSwipe={this.handleSwipe.bind(this)}>
          <div className='pages' ref="pages" id="pages">
            {this.renderChildren()}
          </div>
        </Hammer>

        <Header
            ref='header'
            navOpen={this.state.navOpen}
         />

        <Hammer onTap={ this.navOpen.bind(this) }>
          <div className='navControl' ref='navControl'></div>
        </Hammer>
      
      </div>
    );
  }

}

App.propTypes = propTypes;

export default App;