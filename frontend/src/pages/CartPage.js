import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    
    if (data.instock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row >
        <Col md={8} style={{ backgroundColor: '#222831',borderColor:'#76ABAE;',borderStyle:"solid" }}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item._id}
                  style={{ borderStyle:'none', backgroundColor: 'rgb(34, 40, 49)', marginBottom: '20px' }}
                >
                  <Row
                    className="align-items-center"
                    style={{ backgroundColor: 'rgb(34, 40, 49)' }}
                  >
                    <Col md={4}>
                      <img
                        style={{
                          backgroundColor: 'rgb(34, 40, 49)',
                          borderStyle: 'none',
                        }}
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link
                        style={{
                          color: '#76ABAE',
                          textDecoration: 'none',
                          fontSize: '20px',
                        }}
                        to={`/product/${item.productid}`}
                      >
                        {item.name}{' '}
                      </Link>
                    </Col>
                    <Col md={3}>
                       <Button
                        style={{
                          backgroundColor: '#31363F',
                          border: 'none',
                          color: '#76ABAE',
                        }}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span style={{ color: '#EEEEEE', fontSize: '20px' }}>
                        {item.quantity}
                      </span>{' '}
                      <Button
                        style={{
                          backgroundColor: '#31363F',
                          border: 'none',
                          color: '#76ABAE',
                        }}
                       
                       
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                          
                        }
                       
                        disabled={item.quantity === item.instock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col
                      md={3}
                      style={{
                        color: '#EEEEEE',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                    >
                      ${item.price}
                    </Col>
                    <Col md={2}>
                      <Button
                        style={{
                          backgroundColor: '#31363F',
                          border: 'none',
                          color: '#76ABAE',
                        }}
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card >
            <Card.Body >
              <ListGroup variant="flush">
                <ListGroup.Item >
                  <h3>
                    Total ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item >
                  <div className="d-grid">
                    <Button
                      className="btnsu"
                      style={{
                        background: '#76ABAE',
                        color: '#222831',
                        fontWeight: 'bold',
                        borderStyle: 'none',
                      }}
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
