import React from 'react';
import { updateOrderStatus } from '../../services/api';

const OrderStatus = ({ orderId, currentStatus }) => {
  const handleChangeStatus = newStatus => {
    updateOrderStatus(orderId, newStatus)
      .then(() => {
        console.log('Order status updated');
      })
      .catch(err => console.error('Error updating order status:', err.message));
  };

  return (
    <div className="order-status-container">
      <p>Current Status: {currentStatus}</p>
      <button onClick={() => handleChangeStatus('CLOSED')}>Close Order</button>
    </div>
  );
};

export default OrderStatus;
