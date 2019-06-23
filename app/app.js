import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { NavigationStack } from './navigation';

const store = configureStore({});

const App = () => (
  <Provider store={store}>
    <NavigationStack />
  </Provider>
);

export default App;
