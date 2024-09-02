import React from 'react';
import { updateCart } from '../../services/api';

const ShoppingCartStatus = ({ cartId, currentStatus }) => {
  const handleCloseCart = () => {
    updateCart({ cartId, state: 0 }) 
      .then(() => {
        console.log('Cart closed');
      })
      .catch(err => console.error('Error closing cart:', err.message));
  };

  return (
    <div className="shopping-cart-status-container">
      <p>Current Status: {currentStatus === 1 ? 'Open' : 'Closed'}</p>
      {currentStatus === 1 && <button onClick={handleCloseCart}>Close Cart</button>}
    </div>
  );
};

export default ShoppingCartStatus;