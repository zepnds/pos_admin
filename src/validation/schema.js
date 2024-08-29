import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  password: yup.string().required('Password is required!').trim(),
  email: yup.string().email('Must be a valid email address').required('Email is required!').trim()
});
