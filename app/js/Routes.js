'use strict';

import React                       from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import CreateBrowserHistory        from 'history/lib/createBrowserHistory';

import App                         from './App';
import HomePage                    from './pages/HomePage';
import ComicsPage                  from './pages/ComicsPage';
import CharactersPage              from './pages/CharactersPage';
import CreatorsPage                from './pages/CreatorsPage';


export default (
  <Router history={CreateBrowserHistory()}> 
    <Route path='/' component={App}>

      <IndexRoute component={HomePage} />

      <Route path='/' component={HomePage} />
      <Route path='/comics' component={ComicsPage} />
      <Route path='/characters' component={CharactersPage} />
      <Route path='/creators' component={CreatorsPage} />

    </Route>
  </Router>
);
