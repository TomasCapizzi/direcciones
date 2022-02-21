// navigation
import MainNavigator from './navigation';
import {Provider} from 'react-redux';
import React from 'react';
import store from './store';
import {init} from './db';

init()
  .then(() => {
    console.log('DB initialized');
  })
  .catch(err => {
    console.log('DB failed', err);
  });

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
