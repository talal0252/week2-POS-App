// src/components/ProductForm.js
import React, { useState } from 'react';
import { useProductContext } from '../contexts/ProductContext';
import { toast } from 'react-hot-toast';
import Form from './MainForm';

const ProductForm = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [fetched, setFetched] = useState(false);
  const { state, dispatch } = useProductContext();
  const { products } = state;
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    e.target.classList.contains('is-invalid') && e.target.classList.remove('is-invalid');
    e.target.classList.contains('is-valid') && e.target.classList.remove('is-valid');
    if(name === "price" && value <= 0) {
      e.target.classList.add('is-invalid');
      toast.error('Price must be greater than 0.');
      return;
    } else if(value === "") {
      e.target.classList.add('is-invalid');
      toast.error('Please fill in all fields.');
      return;
    }
    e.target.classList.add('is-valid');
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];    
    e.target.classList.contains('is-invalid') && e.target.classList.remove('is-invalid');
    e.target.classList.contains('is-valid') && e.target.classList.remove('is-valid');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (inner_e) => {
      const img = new Image();
      img.src = inner_e.target.result;
      img.onload = () => {
        if (img.width > 200 || img.height > 200) {
          toast.error('Image must be 200px x 200px or smaller.');          
          e.target.classList.add('is-invalid');
          return;
        }
      }
    }
    e.target.classList.add('is-valid');
    setFormData({ ...formData, image: URL.createObjectURL(file) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() === '' || formData.description.trim() === '' || !formData.image) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (formData.id !== undefined) {
      dispatch({ type: 'UPDATE_PRODUCT', payload: formData });
      toast.success('Product updated successfully!');
      setFormData({
        title: '',
        price: '',
        image: null,
        description: ''
      });
      setFetched(false);
    } else {
      const newProduct = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
        id: Math.random().toString(36).substr(2, 9),
      };

      toast.success('Product added successfully!');

      document.getElementsByName('title')[0].classList.remove('is-valid');
      document.getElementsByName('price')[0].classList.remove('is-valid');
      document.getElementById('desc').classList.remove('is-valid');
      document.getElementsByName('image')[0].classList.remove('is-valid');
      document.getElementsByName('image')[0].value = null;

      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    }
    setFormData({
      title: '',
      price: '',
      image: null,
      description: ''
    });
  };

  return (
    <div>
      <div className='text-center'>
        <button className='btn-primary btn m-5' onClick={(e) => setShowAddForm(!showAddForm)}>Add Product</button>
        <button className='btn-primary btn m-5' onClick={(e) => setShowEditForm(!showEditForm)}>Edit Product</button>
      </div>
      {showAddForm &&       <div className='row justify-content-center'>
        <Form handleSubmit={handleSubmit} handleChange={handleChange} handleImageChange={handleImageChange} formData={formData} />
      </div>}
      {showEditForm && 
        <div>
            <div className='text-center'>
              <input name="fetch" id="fetch" className='text-center p-1' type="text" placeholder="Enter ID" />
              <button className='btn btn-success ml-4' onClick={(e) => {
                  let product = products.filter((product) => String(product.id) === String(document.getElementById('fetch').value))[0];
                  if (product === undefined) {
                    toast.error('Product not found.');
                  } else {
                    setFetched(true);
                    setFormData(product);
                  }
              }}>Fetch</button>
            </div>
            {
              fetched && <div className='row justify-content-center mt-4'>
                <Form handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} />
              </div>
            }
        </div>}
    </div>
  );
};

export default ProductForm;
