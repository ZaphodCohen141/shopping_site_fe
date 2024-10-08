import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductImg from './ProductImg';
import { getProductById, addToCart } from '../../services/api';
import NavBar from '../mainpage/Navbar';
import './ProductDetails.css';

const ProductDetails = ({ currentUser, onLogout, onSearch }) => {  // Added onSearch here
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductById(id)
            .then((res) => {
                setProduct(res.data);
                console.log("Product data:", res.data);
            })
            .catch((err) => console.error('Error getting product:', err.message));
    }, [id]);

    const handleBuy = async () => {
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

    if (!product) {
        return <p>Just have a little patience <b></b>
        Still hurting from a love I lost<b></b>
        I'm feeling your frustration<b></b>
        But any minute all the pain will stop</p>;
    }

    return (
        <div>
            <NavBar currentUser={currentUser} onLogout={onLogout} onSearch={onSearch} /> {/* Added onSearch here */}
            <div className="product-details-container">
                <div className="product-frame">
                    <ProductImg imageUrl={product.imageUrl} altText={product.productName} size="large" />
                    <div className="product-info">
                        <h2>{product.productName}</h2>
                        <p>Price: ${product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Status: {product.status === 1 ? 'Available' : 'Out of Stock'}</p>
                        <button onClick={handleBuy}>Add to Cart</button>
                    </div>
                </div>
                <div className="product-details-placeholder">
                    <p>Placeholder for additional product details.</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
