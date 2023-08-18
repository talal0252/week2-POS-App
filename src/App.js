import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ProductProvider } from './contexts/ProductContext';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const App = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h1
        className="text-center text-danger m-3"
        style={{
          textDecoration: 'underline',
        }}
      >
        Point of Sale App
      </h1>
      <ProductList />
      <ProductForm />
    </div>
  );
};

const AppWithProvider = () => (
  <ProductProvider>
    <App />
  </ProductProvider>
);

export default AppWithProvider;
