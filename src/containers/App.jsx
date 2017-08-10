import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers/index';
import '../stylesheets/style.css';

import SearchApp from './SearchApp';

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

const App = () => (
  <div>
    <Provider store={store}>
      <SearchApp />
    </Provider>
  </div>
);

export default App;
