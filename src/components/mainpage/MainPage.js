import React, { useEffect, useState } from 'react';
import { getProductsByNumber, updateProductImageUrl, searchProducts } from '../../services/api';
import Product from '../product/Product';
import NavBar from './Navbar';
import './MainPage.css';

const MainPage = ({ items, currentUser, onLogout }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (items.length === 0) {
      getProductsByNumber(6)
        .then(async (res) => {
          const productsData = res.data;
          // directly update product image
          const updatedProducts = await Promise.all(
            productsData.map(async (product) => {
              if (!product.imageUrl) {
                const response = await updateProductImageUrl(product.productName);
                product.imageUrl = response.data.imageUrl;
              }
              return product;
            })
          );

          setProducts(updatedProducts);
        })
        .catch((err) => console.log(err.message));
    } else {
      setProducts(items);
    }
  }, [items]);

  const handleSearch = (searchQuery) => {
    searchProducts(searchQuery)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="main-page">
      <NavBar currentUser={currentUser} onLogout={onLogout} onSearch={handleSearch} />
      <main className="main-content">
        <h1 className="main-heading">Welcome to My Shopping Site</h1>
        
        <div className="product-grid">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>

        <button onClick={() => window.location.href='/products'}>
          View All Products
        </button>
      </main>
    </div>
  );
};

export default MainPage;
