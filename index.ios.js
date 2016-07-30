import {Provider} from 'react-redux';
import React from 'react';
import {AppRegistry} from 'react-native';
import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import * as reduxLoop from 'redux-loop';
import middleware from './src/redux/middleware';
import RouterReducer from './src/orderFood/components/appRouter/RouterAction';
import RootView from './src/orderFood/views/RootView/RootView';

const enhancer = compose(
  applyMiddleware(...middleware),
  reduxLoop.install()
);

// create the store

const store = createStore(
  RouterReducer
);

const orderFood = React.createClass({

  render() {
    return (
      <Provider store={store}>
        <RootView />
      </Provider>
    );
  }
});

AppRegistry.registerComponent('RNOrderFood', () => orderFood);
