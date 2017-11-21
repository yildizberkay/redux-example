# Redux Sample Project with 500px API
This repository was prepared to make a simple introduction to Redux. The project was developed using ES6 and Webpack, both ES6 and Webpack are prerequisite.

[![Codacy Badge](https://api.codacy.com/project/badge/9cb917aa3a164299a4d60026886101e3)](https://www.codacy.com/app/yildizbe/redux-example)

![Demo GIF](https://raw.githubusercontent.com/yildizberkay/redux-example/gh-pages/demo.gif)

## Table of contents
- [Installation](#installation)
- [Why do we need Redux?](#why-do-we-need-redux)
  - [Actions](#actions)
  - [Reducers](#reducers)
  - [Store](#store)
- [Directory structure](#directory-structure)
- [Resources](#resources)
- [Changelog](#changelog)
  - [Oct 25, 2015](#oct-25-2015)
  - [Oct 12, 2015](#oct-12-2015)

## Installation
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

ESLint
```
npm run lint
```

## Why do we need Redux?
Let's think about an ordinary React app. There are components, states, props and API actions. A component calls another components and if you trigger an UI state, view is updated and etc... Finally, the app becomes complex and you cannot control it.

> React is a JavaScript library for creating user interfaces by Facebook and Instagram. Many people choose to think of React as the V in MVC.
>
> Source: https://facebook.github.io/react/docs/why-react.html

We need a state container like Redux. How does Redux solve this problem?
Basically, there is a single store source which is read-only. If you want to make an action like load photos from API, you have to make this using actions and reducers.

There are 3 primary parts of Redux: actions, reducers and store.

#### Actions
Actions are used to get data. API requests can be made in this part.

> Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.
>
> Source: https://redux.js.org/docs/basics/Actions.html

In the following sample, there is an action that is named as **searchPhotoAction**. This action returns a function that contains *searchWithPhotoAPI* and *dispatch* function notifies *store*. As you can see, first of all, *dispatch* sends a "SEARCH_PENDING" type, this shows a spinner in the screen. After that, if the request is succeeded, *dispatch* sends a "SEARCH_DONE", photo array and another info.

```javascript
function searchWithPhotoAPI(keyword, page, dispatch) {
  if (page >= 2) {
    dispatch({
      type: types.SEARCH_PENDING_FOR_NEXT,
    });
  } else {
    dispatch({
      type: types.SEARCH_PENDING,
    });
  }
  photoSearch(keyword, page, (data) => {
    dispatch({
      type: types.SEARCH_DONE,
      photos: data.photos,
      page,
      keyword,
    });
  });
}

export function searchPhotoAction(keyword, page = 1) {
  return (dispatch) => {
    searchWithPhotoAPI(keyword, page, dispatch);
  };
}
```

#### Reducers
Data comes to Reducers, and it is reshaped here. After that, it is passed to views. You can combine previous state with next state in this step.

In following code, returned state is changing according to **action.type**. If ***action.type*** is *types.SEARCH_PENDING*, we will show a spinner in view.

```javascript
const searchPhotos = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_DONE:
      return {
        ...state,
        photos: [...state.photos, ...action.photos],
        status: 'DONE',
        page: action.page,
        keyword: action.keyword,
      };
    case types.SEARCH_PENDING_FOR_NEXT:
      return {
        ...state,
        status: 'PENDING_FOR_NEXT',
      };
    case types.SEARCH_PENDING:
      return {
        ...state,
        photos: [],
        status: 'PENDING',
      };
    default:
      return state;
  }
}
```

#### Store
In the Redux, there is only one store. It can be created directly using createStore as well as applyMiddleware.

```javascript
// containers/App.jsx

const reducer = combineReducers({ searchPhotos });
const store = createStore(reducer, {}, applyMiddleware(thunk));

const App = () => (
  <div>
    <Provider store={store}>
      <SearchApp />
    </Provider>
  </div>
)
```

#### Calling Actions

Before call an action, we have to combine actions and dispatch function. *connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])* function connects a React component to a Redux store.

**bindActionCreators(actionCreators, dispatch)** combines actions and dispatch function.

```javascript
// containers/SearchApp.jsx

...

class SearchApp extends PureComponent {
  render() {
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
          <PhotoList actions={actions} photos={this.props.photos} status={this.props.status} />
        </div>
      </div>
    );
  }
}

...

export default connect(
  mapStateToProps,
)(SearchApp);
```

Now, you can call actions via following code.

```
actions.searchPhotoAction(keyword, page)
```


## Directory structure
```
Root
├── public
│   ├── actions
├── src
│   ├── actions
│   │   └──
│   ├── api
│   │   └──
│   ├── components
│   │   └──
│   ├── constants
│   │   └──
│   ├── containers
│   │   └──
│   ├── reducers
│   │   └──
│   ├── stylesheets
│   │   └──
│   └── index.js
├── .eslintignore
├── .eslintrc.json
├── package.json
└── README.md
```

## Resources
- https://reactjs.org/
- https://redux.js.org/
- https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb

## Changelog

### Nov 21, 2017
- README update.
- ReactJS version update. [15.6.2]
- Redux version update. [3.7.2]
- React Scripts migration.

### Aug 10, 2017
- Dependencies of the project are updated.
- Code refactoring.

### Oct 25, 2015
- Fetch support for all browsers. [@pcanterini](https://github.com/pcanterini) [PR](https://github.com/yildizberkay/redux-example/pull/1)
- Airbnb ESLint rules were added.

### Oct 12, 2015
- Initial commit.
