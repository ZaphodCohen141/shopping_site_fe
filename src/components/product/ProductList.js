import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/api';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedProducts = products.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="product-list">
      <button className="shop-logo" onClick={() => window.location.href = '/'}>
        ShopLogo
      </button>
      <h2>All Products</h2>
      <div className="product-grid">
        {displayedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.productName}</h3>
            <p>Price: ${product.price}</p>
            <p>Available: {product.quantity}</p>
            <p>Status: {product.status === 1 ? 'In Stock' : 'Out of Stock'}</p>
          </div>
        ))}
      </div>
      <div className="page-controls">
        <button onClick={prevPage} disabled={currentPage === 0}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={(currentPage + 1) * itemsPerPage >= products.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
