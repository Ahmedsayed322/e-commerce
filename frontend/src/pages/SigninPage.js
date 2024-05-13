import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { getError } from '../components/utils';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

export default function SigninPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await Axios.post('/api/users/signin', values);
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
    setSubmitting(false);
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3" controlId="email">
              <label htmlFor="email" style={{ fontSize: '25px' }}>Email</label>
              <Field
                type="email"
                name="email"
                required
                style={{ fontSize: '20px' }}
              />
            </div>
            <div className="mb-3" controlId="password">
              <label htmlFor="password" style={{ fontSize: '25px' }}>Password</label>
              <Field
                type="password"
                name="password"
                required
                style={{ fontSize: '20px' }}
              />
            </div>
            <div className="mb-3">
              <Button type="submit" className="sign-in-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
            <div
              className="mb-3"
              style={{ color: 'rgb(118, 171, 174)', fontSize: '20px' }}
            >
              New customer?{' '}
              <Link to={`/signup?redirect=${redirect}`} style={{ color: '#EEEE' }}>
                Create your account
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
}