import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductImg from './ProductImg';
import { getProductById } from '../../services/api';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductById(id)
            .then((res) => {
                setProduct(res.data);
                console.log("Product data:", res.data);
            })
            .catch((err) => console.error('Error fetching product:', err.message));
    }, [id]);

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
                </div>
            </div>
            <div className="product-details-placeholder">
                <p>Placeholder for additional product details.</p>
            </div>
        </div>
    );
};

export default ProductDetails;
