# Redux Sample Project with 500px API
This repository was prepared to make a simple introduction to Redux. The project was developed using ES6 and Webpack, and* both ES6 and Webpack are prerequisite.

### Installation
Clone the repository and install dependencies.

```
git clone https://github.com/yildizberkay/redux-example.git
cd redux-example
```

```
npm install
npm start
open http://localhost:3000
```

### Why do we need Redux?
Let's think about an ordinary React app. There are components, states, props and API actions. A component calls another components and if you trigger an UI state, view is updated and etc... Finally, the app becomes complex and you cannot control it.

> React is a JavaScript library for creating user interfaces by Facebook and Instagram. Many people choose to think of React as the V in MVC.
> Source: https://facebook.github.io/react/docs/why-react.html

We need a state container like Redux. How does Redux solve this problem?
Basically, there is a single store source which is read-only. If you want to make an action like load photos from API, you have to make this using actions and reducers.

There are 3 primary parts of Redux: actions, reducers and store.

#### Actions
Actions are used to get data. API requests can be made in this part.

> Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.
> Source: http://rackt.github.io/redux/docs/basics/Actions.html

In following code, firstly **searchPhotoAction** passes only one data type, after end of the request, payload and other informations are sent using dispatch callback. Using type variable, you can determine request's state, and show a spinner.

```javascript
function searchWithPhotoAPI(keyword, page, dispatch){
    dispatch({
      type: types.SEARCH_PENDING
    });

    PhotoSearch(keyword, page, (d) => {
      dispatch({
        type: types.SEARCH_DONE,
        photos: d.photos,
        page,
        keyword
      });
  });
}

export function searchPhotoAction(keyword, page = 1){
  return (dispatch, getState) => {
    searchWithPhotoAPI(keyword, page, dispatch);
  }
}
```

#### Reducers
Data comes to Reducers, and it is reshaped here. After that, it is passed to views. You can combine previous state with next state in this step.

In following code, returned state is changing according to **action.type**. If ***action.type*** is *types.SEARCH_PENDING*, we will show a spinner in view.

```javascript
export default function searchPhotos(state = initialState, action){
  switch (action.type) {
    case types.SEARCH_DONE:
      return {
        ...state,
        photos: [...state.photos, ...action.photos],
        status: 'DONE',
        page: action.page,
        keyword: action.keyword
      }
    case types.SEARCH_PENDING_FOR_NEXT:
      return {
        ...state,
        status: 'PENDING_FOR_NEXT'
      }
    case types.SEARCH_PENDING:
        return {
          ...state,
          photos: [],
          status: 'PENDING'
        }
    default:
      return state;
  }
}
```

#### Store
In the Redux, there is only one store. It can be created directly using createStore as well as applyMiddleware.

```javascript
// containers/App.js

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <SearchApp />
        </Provider>
      </div>
    );
  }
}
```

Store is passed to containers using *@connect* decorator as props.

```javascript
// containers/SearchApp.js

@connect(state => ({
  photos: state.photos.photos,
  status: state.photos.status
}))
export default class SearchApp extends Component {

  static propTypes = {
    status: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render () {
    const actions = bindActionCreators(action, this.props.dispatch);

    return (
      <div>
        <div id="header" className="header">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-md-offset-3 search-bar-content">
                <h1>Search on 500px</h1>
                <SearchInput actions={actions} status={this.props.status} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <PhotoList actions={actions} photos={this.props.photos} status={this.props.status}/>
        </div>
      </div>

    );
  }
}
```

### Directory structure
```
Root
├── src
│   ├── actions
│   │   └──
│   ├── reducers
│   │   └──
│   ├── constants
│   │   └──
│   ├── containers
│   │   └──
│   ├── components
│   │   └──
│   ├── api
│   │   └──
│   └── index.js
├── index.html
├── package.json
├── server.js
└── webpack.config.js
```
