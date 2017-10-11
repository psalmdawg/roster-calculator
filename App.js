import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
// import Dashboard from './src/components/dashboard';
import thunkMiddleware from 'redux-thunk'
import Router from './src/router';

// export default function configureStore(initialState) {
//   const store = createStore(reducers, initialState);
//
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextRootReducer = require('./src/reducers');
//       store.replaceReducer(nextRootReducer);
//     });
//   }
//
//   return store;
// }

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = createStore(reducers, {}, applyMiddleware() );

export default class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
