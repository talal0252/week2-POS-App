import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null,
  filterBy: '',
  formData: {
    id: 0,
    title: '',
    price: 0.0,
    description: '',
    image: '',
  },
};

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
  },
);

/* eslint-disable no-param-reassign */

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  },
});

/* eslint-enable no-param-reassign */

export const { updateFilterBy, setFormData } = productSlice.actions;

export default productSlice.reducer;
