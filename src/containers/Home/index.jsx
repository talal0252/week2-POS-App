import React from 'react';
import { Toaster } from 'react-hot-toast';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const Home = () => {
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

export default Home;
