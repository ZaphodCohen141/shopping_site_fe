import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductImg from './ProductImg';
import './Product.css';

const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <ProductImg imageUrl={product.imageUrl} altText={product.productName} size="small" />
      <h3>{product.productName}</h3>
      <p>Price: ${product.price}</p>
      <p>Available: {product.quantity} in stock</p>
      <p>Status: {product.status === 1 ? 'Available' : 'Out of Stock'}</p>
    </div>
  );
};

export default Product;
