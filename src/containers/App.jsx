import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import searchPhotos from '../reducers/Photos';
import '../stylesheets/style.css';

import SearchApp from './SearchApp';

const reducer = combineReducers({ searchPhotos });
const store = createStore(reducer, {}, applyMiddleware(thunk));

const App = () => (
  <div>
    <Provider store={store}>
      <SearchApp />
    </Provider>
  </div>
);

export default App;
