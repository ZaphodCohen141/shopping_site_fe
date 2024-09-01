import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductImg from './ProductImg';
import './Product.css';
import { addFavorite, addToCart } from '../../services/api';

const Product = ({ product, userId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleBuy = () => {
    addToCart(userId, product.id, 1); 
  };

  const handleLike = () => {
    addFavorite(userId, product.id);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <ProductImg imageUrl={product.imageUrl} altText={product.productName} size="small" />
      <h3>{product.productName}</h3>
      <p>Price: ${product.price}</p>
      <p>Available: {product.quantity} in stock</p>
      <p>Status: {product.status === 1 ? 'Available' : 'Out of Stock'}</p>
      <button onClick={handleBuy}>Buy</button>
      <button onClick={handleLike}>Like</button>
    </div>
  );
};

export default Product;
