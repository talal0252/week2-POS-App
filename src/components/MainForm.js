
const Form = ({handleSubmit, handleChange, handleImageChange, formData}) => {

  return (
    <form onSubmit={handleSubmit} className='text-center'>
          <div className='form-group'>
            <label for='title'>Title</label>
            <input className='form-control' type="text" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label for='price'>Price</label>
            <input className='form-control' type="number" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label for='description'>Description</label>
            <textarea className='form-control' id="desc" name="description" value={formData.description} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label for='image'>Image</label>
            {handleImageChange !== undefined && <input accept="image/*" className='form-control' type="file" name="image" onChange={handleImageChange} /> }
            {handleImageChange === undefined && <input className='form-control' type="text" name="image" value={formData.image} onChange={handleChange} /> }
          </div>
          <button type="submit" className='btn btn-success'>Submit</button>
        </form>
  )

}

export default Form;