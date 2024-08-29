import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import DefaultInput from './default';
import PasswordInput from './password';

export const inputComponents = {
  default: DefaultInput,
  password: PasswordInput
};

const Input = forwardRef(({ variant, ...props }, ref) => {
  const Component = inputComponents[variant];
  const _props = { ...props, ref };

  if (Component) return <Component {..._props} />;
  return <DefaultInput {..._props} />;
});

Input.propTypes = { variant: PropTypes.string };

export default Input;
