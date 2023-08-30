import React from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './store';
import Home from './containers/Home';

function App() {
  return (
    <Provider store={store}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Home />
    </Provider>
  );
}

export default App;
