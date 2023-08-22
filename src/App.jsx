import React from 'react';
import Home from './containers/Home';
import { ProductProvider } from './contexts/ProductContext';

function App() {
  return (
    <ProductProvider>
      <Home />
    </ProductProvider>
  );
}

export default App;
