import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchProducts } from 'store/slices/productSlice';
import Modal from './components/Modal';
import Bar from './components/AppBar';
import ProductItem from './components/ProductItem';
import loadingGif from '../../assets/Ball.gif';

export default function Home() {
  const [editProduct, setEditProduct] = useState(false);
  const dispatch = useDispatch();
  const {
    loading, error, products, filterBy,
  } = useSelector((state) => state.product);
  const filteredProducts = products.filter(
    (product) => product.title.toLowerCase().includes(filterBy.toLowerCase()),
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const toggleEditProduct = () => {
    setEditProduct(!editProduct);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Bar />
      {loading && (
        <img
          src={loadingGif}
          alt="loading..."
          style={{
            margin: '0 auto',
            width: '100%',
          }}
        />
      )}
      {filteredProducts && (
        <Grid container spacing={2} marginTop={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product.id}>
              <ProductItem product={product} toggler={toggleEditProduct} />
            </Grid>
          ))}
          <Modal open={editProduct} handleClose={toggleEditProduct} />
        </Grid>
      )}
    </Box>
  );
}
