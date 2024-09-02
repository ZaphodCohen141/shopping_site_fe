import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCart, createOrder, deleteCart, updateOrderStatus } from '../../services/api';
import './ShoppingCart.css';

const ShoppingCart = ({ currentUser }) => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { username } = location.state || {}; 
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (username) {
      getCart(username)
        .then(res => setCart(res.data))
        .catch(err => console.error('Error getting cart:', err.message));
    }
  }, [username]);

  const handleBuyNow = async () => {
    if (!cart || !currentUser) return;
    try {
      const orderDetails = {
        userId: currentUser.id,
        orderDate: new Date(),
        shippingAddress: currentUser.address, 
        totalPrice: cart.amount,
        orderStatus: 'TEMP',
      };

      const orderResponse = await createOrder(orderDetails);
      console.log('Order created with ID:', orderResponse.data);

      await deleteCart(username);
      console.log('Shopping cart deleted');

      await updateOrderStatus(orderResponse.data, 'CLOSED');
      console.log('Order status CLOSED');

      // Redirect to PrevOrder component
      navigate('/prevOrders', { state: { userId: currentUser.id } });
    } catch (error) {
      console.error('Error processing order:', error.message);
    }
  };

  if (!cart) return <p>Go on, Buy something. We kinda need the money...</p>;

  return (
    <div className="shopping-cart-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {cart.productsList.map(product => (
          <div key={product.id} className="cart-item">
            <p className="product-name">{product.productName}</p>
            <p className="product-details">${product.price} x {product.quantity}</p>
          </div>
        ))}
      </div>
      <div className="cart-actions">
        <button className="buy-button" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
