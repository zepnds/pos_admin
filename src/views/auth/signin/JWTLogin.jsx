import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { authError, updateAuth, usePostLoginUserMutation } from 'store/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from 'components/input';
import { loginSchema } from 'validation/schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const JWTLogin = () => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [reqLogin, { data, isError, isLoading, isSuccess, error }] = usePostLoginUserMutation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      setLoading(false);
      if (error?.status === 403) {
        dispatch(authError({ err: true, errMsg: 'Invalid access' }));
      }
    }
  }, [isError, error, dispatch]);
  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      const _user = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        csrf: data.csrf,
        email: data.email,
        role: data.role,
        id: data.id
      };

      localStorage.setItem('access', JSON.stringify(_user));

      dispatch(updateAuth(_user));
      navigation('/app/dashboard/default');
    }
  }, [isSuccess, data, dispatch, navigation]);

  const onSubmit = (data) => {
    reqLogin(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      {auth.err ? (
        <div className="alert alert-danger" role="alert">
          {auth.errMsg}
        </div>
      ) : null}
      <div className="form-group mb-3">
        <Input placeholder="Email" className="form-control" name="email" variant="default" control={control} />
      </div>
      <div className="form-group mb-4">
        <Input placeholder="Password" className="form-control" control={control} name="password" variant="password" />
      </div>

      <Row>
        <Col mt={2}>
          <Button className="btn-block mb-4 w-100 app-button" size="large" type="submit" variant="primary">
            {loading ? (
              <div className="loading-area">
                <Spinner animation="border" />
                <span>Signing in..</span>
              </div>
            ) : (
              'Signin'
            )}
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default JWTLogin;
