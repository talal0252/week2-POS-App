import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchProducts } from 'store/slices/productSlice';
import validationSchema from 'schemas/ProductValidationSchema';
import styles from './MainForm.styles';

function MainForm() {
  const { products, formData } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const method = values.id ? 'PUT' : 'POST';
    const product = {
      title: values.title,
      price: values.price,
      description: values.description,
      image: values.image,
      id: values.id ? values.id : products.length + 1,
    };
    const urlPath = method === 'POST' ? '/products' : `/products/${values.id}`;
    fetch(`http://fakestoreapi.com${urlPath}`, {
      method,
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(JSON.stringify(data));
        dispatch(fetchProducts());
      })
      .catch((err) => toast.error(err.message));
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleImageChange = ({ target }) => {
    const file = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (innerEvent) => {
      const img = new Image();
      img.src = innerEvent.target.result;
      img.onload = () => {
        if (img.width > 200 || img.height > 200) {
          toast.error('Image must be 200px x 200px or smaller.');
        }
      };
    };
    formik.setFieldValue('image', URL.createObjectURL(file));
  };

  return (
    <form onSubmit={formik.handleSubmit} style={styles.form}>
      <div>
        <label htmlFor="title" style={styles.label}>
          Title
          <input
            type="text"
            name="title"
            id="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            style={styles.input}
          />
          {formik.errors.title && (
            <span style={styles.error}>{formik.errors.title}</span>
          )}
        </label>
      </div>
      <div>
        <label htmlFor="price" style={styles.label}>
          Price
          <input
            type="number"
            name="price"
            id="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            style={styles.input}
          />
          {formik.errors.price && (
            <span style={styles.error}>{formik.errors.price}</span>
          )}
        </label>
      </div>
      <div>
        <label htmlFor="description" style={styles.label}>
          Description
          <textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            style={styles.input}
          />
          {formik.errors.description && (
            <span style={styles.error}>{formik.errors.description}</span>
          )}
        </label>
      </div>
      <div>
        <label htmlFor="image" style={styles.label}>
          Image
          {formik.values.image && (
            <img
              src={formik.values.image}
              alt="Preview"
              style={styles.imagePreview}
            />
          )}
          <input
            accept="image/*"
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            style={styles.input}
          />
          {formik.errors.image && (
            <span style={styles.error}>{formik.errors.image}</span>
          )}
        </label>
      </div>
      <button type="submit" style={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}

export default MainForm;
