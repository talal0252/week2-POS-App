import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setFormData } from 'store/slices/productSlice';

function ProductItem({ product, toggler }) {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      id: product.id,
    }));
    toggler();
  };

  return (
    <Card raised sx={{ maxWidth: 350, margin: '0 auto', padding: '0.1em' }}>
      <CardMedia
        component="img"
        height="300"
        alt={product.title}
        image={product.image}
        title={product.title}
        sx={{ padding: '1em 1em 0 1em', objectFit: 'contain' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title.length >= 50 ? `${product.title.slice(0, 47)}...` : product.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {`$${product.price}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description.length >= 100 ? `${product.description.slice(0, 100)}...` : product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleEdit}>Edit</Button>
      </CardActions>
    </Card>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  toggler: PropTypes.func.isRequired,
};

export default ProductItem;
