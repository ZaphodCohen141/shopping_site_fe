import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductImg from './ProductImg';
import './Product.css';
import { addFavorite, addToCart } from '../../services/api';

const Product = ({ product, currentUser }) => {
  const navigate = useNavigate();

  const handleBuy = async (event) => {
    event.stopPropagation(); 
    if (!currentUser) {
      console.error("User not logged in");
      return;
    }

    try {
      const response = await addToCart(currentUser.username, product.id);
      console.log("Product added to cart successfully", response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleLike = async (event) => {
    event.stopPropagation();

    if (!currentUser) {
      console.error("User not logged in");
      return;
    }

    try {
      await addFavorite(currentUser.id, product.id);
      console.log("Product added to favorites successfully");
    } catch (error) {
      console.error("Error adding product to favorites:", error.message);
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <ProductImg imageUrl={product.imageUrl} altText={product.productName} size="small" />
      <h3>{product.productName}</h3>
      <p>Price: ${product.price}</p>
      <p>Available: {product.quantity} in stock</p>
      <p>Status: {product.status === 1 ? 'Available' : 'Out of Stock'}</p>
      <button onClick={handleBuy}>Add To Cart</button>
      <button onClick={handleLike}>Like</button>
    </div>
  );
};

export default Product;
