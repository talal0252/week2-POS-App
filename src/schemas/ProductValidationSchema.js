import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  price: Yup.number().required('Price is required').positive('Price must be greater than 0'),
  description: Yup.string().required('Description is required').min(25, 'Description is too short'),
  image: Yup.string().required('Image is required'),
});

export default validationSchema;
