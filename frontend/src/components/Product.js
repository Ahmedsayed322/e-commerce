import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import  './pstyle.css'
import Rating from './Rating';
import { useContext } from 'react';
import { Store } from '../Store';
import axios from 'axios';
import { toast } from 'react-toastify';

function Product(props)
{
    const{product}=props
    const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart:{cartItems}, } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.instock < quantity) {
      toast.error("We have no More From this item");
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM', payload: { ...product, quantity },
    });
  };
    return(
        <Card style={{backgroundColor:"#31363F"}} id='animation'>
              <Link to={`/product/${product.productid}`}>
                <img src={product.image} className="card-img-top" alt={product.name} />
              </Link>
              <Card.Body>
                <Link to={`/product/${product.productid}`} className="namelink">
                  <Card.Title className='Title-1'>{product.name}</Card.Title>  
                  </Link>
                  <Rating  rating={product.rating} numReview={product.numReview}/>
                  <Card.Text style={{fontSize:"20px", color:"#76ABAE"}}>price: <strong>{product.price}$</strong> </Card.Text>
           
            {product.instock === 0 ? (
          <Button style={{backgroundColor:"red",fontWeight:"bold"}} variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button className='btnsu' onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
              </Card.Body>
            </Card>
    )
}
export default Product