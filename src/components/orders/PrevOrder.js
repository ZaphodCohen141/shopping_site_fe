import React, { useEffect, useState } from 'react';
import { getOrdersByUserId } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './PrevOrder.css'; // You may add CSS styling here

const PrevOrder = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrdersByUserId(userId)
      .then(res => setOrders(res.data))
      .catch(err => console.error('Error getting orders:', err.message));
  }, [userId]);

  const handleReturnToMainPage = () => {
    navigate('/');
  };

  return (
    <div className="prev-order-container">
      <h2>Your Previous Orders</h2>
      {orders.map(order => (
        <div key={order.orderId} className="order-card">
          <p>Order ID: {order.orderId}</p>
          <p>Date: {order.orderDate}</p>
          <p>Total: ${order.totalPrice}</p>
          <p>Status: {order.orderStatus}</p>
        </div>
      ))}
      <div className="order-actions">
        <button className="return-button" onClick={handleReturnToMainPage}>
          Return to Main Page
        </button>
      </div>
    </div>
  );
};

export default PrevOrder;
