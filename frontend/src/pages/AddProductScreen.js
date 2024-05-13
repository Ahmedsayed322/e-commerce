import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '..//components/utils';
import Axios from 'axios';

export default function AddProductScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [productId, setProductId] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [instock, setInstock] = useState('');
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState(0);
  const [numReview, setNumReview] = useState(0);
  const [description, setDescription] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/products/add-product', {
        name,
        productid: productId,
        category,
        image,
        price,
        instock,
        brand,
        rating,
        numReview,
        description,
      });
      toast.success('Product added successfully');
      
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <h1 className="my-3">Add Product</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productId">
          <Form.Label>Product ID</Form.Label>
          <Form.Control onChange={(e) => setProductId(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control onChange={(e) => setCategory(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control onChange={(e) => setImage(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
  <Form.Label>Price</Form.Label>
  <Form.Control
    type="number"
    step="0.01"
    min="0"
    onChange={(e) => setPrice(e.target.value)}
    required
  />
</Form.Group>

<Form.Group className="mb-3" controlId="instock">
  <Form.Label>In Stock</Form.Label>
  <Form.Control
    type="number"
    min="0"
    onChange={(e) => setInstock(e.target.value)}
    required
  />
</Form.Group>

<Form.Group className="mb-3" controlId="brand">
  <Form.Label>Brand</Form.Label>
  <Form.Control
    onChange={(e) => setBrand(e.target.value)}
    required
  />
</Form.Group>
<Form.Group className="mb-3" controlId="description">
  <Form.Label>Description</Form.Label>
  <Form.Control
    as="textarea"
    rows={5}
    onChange={(e) => setDescription(e.target.value)}
    required
  />
</Form.Group>

        <div className="mb-3">
          <Button type="submit" className='btnsu' style={{color:"#EEEE"}}>Add Product</Button>
        </div>
        <div className="mb-3">
          <Link to="/">Go back to Home</Link>
        </div>
      </Form>
    </Container>
  );
}