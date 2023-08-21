import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useProductContext } from 'contexts/ProductContext';
import Form from '../MainForm';
import { addProduct, updateProduct } from 'actions';

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

  const handleChange = ({ target }) => {
    const { name, value } = target;
    target.classList.toggle('is-invalid', false);
    target.classList.toggle('is-valid', false);

    if (name === 'price' && value <= 0) {
      target.classList.toggle('is-invalid', true);
      toast.error('Price must be greater than 0.');
      return;
    } else if (value === '') {
      target.classList.toggle('is-invalid', true);
      toast.error('Please fill in all fields.');
      return;
    }

    target.classList.toggle('is-valid', true);
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = ({ target }) => {
    const file = target.files[0];
    target.classList.toggle('is-invalid', false);
    target.classList.toggle('is-valid', false);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (innerEvent) => {
      const img = new Image();
      img.src = innerEvent.target.result;
      img.onload = () => {
        if (img.width > 200 || img.height > 200) {
          toast.error('Image must be 200px x 200px or smaller.');
          target.classList.toggle('is-invalid', true);
          return;
        }
      };
    };

    target.classList.toggle('is-valid', true);
    setFormData(prevFormData => ({
      ...prevFormData,
      image: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.title.trim() === '' ||
      formData.description.trim() === '' ||
      !formData.image
    ) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (formData.id) {
      dispatch(updateProduct(formData));
      toast.success('Product updated successfully!');      
      setFetched(false);
      resetFormData();
    } else {
      const newProduct = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
        id: Math.random().toString(36).substr(2, 9),
      };

      toast.success('Product added successfully!');

      ['title', 'price', 'desc', 'image'].forEach(fieldName => {
        document.getElementsByName(fieldName)[0].classList.remove('is-valid');
      });
      document.getElementsByName('image')[0].value = null;
      dispatch(addProduct(newProduct));
    }
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      title: '',
      price: '',
      image: null,
      description: '',
    });
  }

  const handleFetch = () => {
    const product = products.find(
      product => 
      String(product.id) === String(document.getElementById('fetch').value)
    );

    if (!product) {
      toast.error('Product not found.');
    } else {
      setFetched(true);
      setFormData(product);
    }
  };

  const formComponent = (
    <Form
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      formData={formData}
    />
  );

  const handleAddProductButton = () => {
    setShowAddForm(!showAddForm);
    setShowEditForm(false);
    setFetched(false);
    resetFormData();
  }

  const handleEditProductButton = () => {
    setShowEditForm(!showEditForm);
    setShowAddForm(false);
    setFetched(false);
    resetFormData();
  }

  return (
    <div>
      <div className="text-center">
        <button
          className="btn-primary btn m-5"
          onClick={handleAddProductButton}
        >
          Add Product
        </button>
        <button
          className="btn-primary btn m-5"
          onClick={handleEditProductButton}
        >
          Edit Product
        </button>
      </div>
      {showAddForm && (
        <div className="row justify-content-center">
          {formComponent}
        </div>
      )}
      {showEditForm && (
        <div>
          <div className="text-center">
            <input
              name="fetch"
              id="fetch"
              className="text-center p-1"
              type="text"
              placeholder="Enter ID"
            />
            <button
              className="btn btn-success ml-4"
              onClick={handleFetch}
            >
              Fetch
            </button>
          </div>
          {fetched && (
            <div className="row justify-content-center mt-4">
              {formComponent}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductForm;
