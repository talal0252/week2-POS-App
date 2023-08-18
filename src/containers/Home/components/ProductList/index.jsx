import React, { useState } from 'react';
import { useProductContext } from 'contexts/ProductContext';
import { deleteProduct } from 'actions';
import './ProductList.css';

const ProductList = () => {
  const { state, dispatch } = useProductContext();
  const [query, setQuery] = useState('');
  const { products } = state;

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div>
      <div className="text-center">
        <h2 className="mt-5 mb-3 text-primary">Product List</h2>
        <input
          className="text-center mb-4 p-2"
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleSearch}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="row justify-content-center">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-3">
              <div className="card m-2">
                <div className="card-header text-center">
                  {product.title.length <= 37
                    ? product.title
                    : product.title.substring(0, 34) + '...'}
                </div>
                <div className="card-header text-center">ID({product.id})</div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="p-3 card-img-top"
                />
                <div className="card-body text-center">
                  <p className="card-text">${product.price}</p>
                  <p className="card-text">
                    {product.description.length <= 100
                      ? product.description
                      : product.description.substring(0, 100) + '...'}
                  </p>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
