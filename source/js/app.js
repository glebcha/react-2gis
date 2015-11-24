/**
 * 2GIS iOS
 */

import React  from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import history from './util/history';

import Application from './components/Application.react';
import Items from './components/Items.react';
import Item from './components/Item.react';

render((
  <Router history={history}>
	<Route path='/' component={Application}>
	  <IndexRoute component={Items} />
	  <Route path='item/:itemId' component={Item} />
	</Route>
  </Router>
), document.getElementById('main'))