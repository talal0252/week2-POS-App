import React, {
  createContext, useReducer, useContext, useEffect, useMemo,
} from 'react';
import axios from 'axios';
import {
  ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, setProducts,
} from 'actions';
import PropTypes from 'prop-types';

const ProductContext = createContext();

const initialState = {
  products: [],
};

const productReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) => (product.id
          === action.payload.id ? action.payload : product)),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload,
        ),
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const providedValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;
        dispatch(setProducts(products));
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={providedValue}>
      {children}
    </ProductContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useProductContext = () => useContext(ProductContext);

export { ProductProvider, useProductContext };