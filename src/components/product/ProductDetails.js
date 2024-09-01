import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductImg from './ProductImg';
import { getProductById, addToCart, addFavorite } from '../../services/api'; // Import functions
import './ProductDetails.css';

const ProductDetails = ({ currentUser }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    // Get the current user's ID
    const userId = currentUser ? currentUser.id : null;

    useEffect(() => {
        getProductById(id)
            .then((res) => {
                setProduct(res.data);
                console.log("Product data:", res.data);
            })
            .catch((err) => console.error('Error getting product:', err.message));
    }, [id]);

    const handleBuy = () => {
        if (userId) {
            addToCart(userId, product.id, 1);
        } else {
            alert("Please log in to buy products.");
        }
    };

    const handleLike = () => {
        if (userId) {
            addFavorite(userId, product.id);
        } else {
            alert("Please log in to like products.");
        }
    };

    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className="product-details-container">
            <div className="product-frame">
                <ProductImg imageUrl={product.imageUrl} altText={product.productName} size="large" />
                <div className="product-info">
                    <h2>{product.productName}</h2>
                    <p>Price: ${product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Status: {product.status === 1 ? 'Available' : 'Out of Stock'}</p>
                    <button onClick={handleBuy}>Buy</button>
                    <button onClick={handleLike}>Like</button>
                </div>
            </div>
            <div className="product-details-placeholder">
                <p>Placeholder for additional product details.</p>
            </div>
        </div>
    );
};

export default ProductDetails;
