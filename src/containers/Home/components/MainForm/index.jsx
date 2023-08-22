import React from 'react';
import PropTypes from 'prop-types';

function Form({
  handleSubmit, handleChange, handleImageChange, formData,
}) {
  return (
    <form onSubmit={handleSubmit} className="text-center">
      <div className="form-group">
        <label htmlFor="title">
          Title
          <input
            className="form-control"
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="price">
          Price
          <input
            className="form-control"
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="desc">
          Description
          <textarea
            className="form-control"
            id="desc"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="image">
          Image
          {handleImageChange ? (
            <input
              accept="image/*"
              className="form-control"
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
            />
          ) : (
            <input
              className="form-control"
              type="text"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
            />
          )}
        </label>
      </div>
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  // formData: PropTypes.object.isRequired,
  // Prop type object is forbiddenn
  formData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Form;
