import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { setFormData, updateFilterBy } from 'store/slices/productSlice';
import {
  Search, SearchIconWrapper, StyledInputBase, CustomButton,
} from './AppBar.styles';
import Modal from '../Modal';

function Bar() {
  const [addProduct, setAddProduct] = useState(false);

  const dispatch = useDispatch();

  const handleValueChange = (event) => {
    dispatch(updateFilterBy(event.target.value));
  };

  const toggleAddProduct = () => {
    dispatch(setFormData({
      title: '',
      price: 0,
      description: '',
      image: '',
      id: null,
    }));
    setAddProduct(!addProduct);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          POS App
        </Typography>
        <CustomButton color="while" aria-label="add product" onClick={toggleAddProduct}>
          <AddIcon />
        </CustomButton>
        <Modal open={addProduct} handleClose={toggleAddProduct} />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleValueChange}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}

export default Bar;
