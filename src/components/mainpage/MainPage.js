import React, { useEffect, useState } from 'react';
import { getProductsByNumber, updateProductImageUrl, searchProducts } from '../../services/api';
import Product from '../product/Product';
import NavBar from './Navbar';
import './MainPage.css';
import { getUserLoginStatus } from '../../services/api';

const MainPage = ({ items, currentUser, onLogout }) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getUserLoginStatus(currentUser.username)
        .then(res => {
          if (res.data === 1) {
            setUser(currentUser);
          } else {
            setUser(null);
          }
        })
        .catch(err => console.error('Error checking user status:', err.message));
    }

    if (items.length === 0) {
      getProductsByNumber(6)
        .then(async (res) => {
          const productsData = res.data;
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
        .catch(err => console.log(err.message));
    } else {
      setProducts(items);
    }
  }, [items, currentUser]);

  const handleSearch = (searchQuery) => {
    searchProducts(searchQuery)
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.log(err.message));
  };

  return (
    <div className="main-page">
      <NavBar currentUser={user} onLogout={onLogout} onSearch={handleSearch} />
      <main className="main-content">
        <h1 className="main-heading">Welcome to My Shopping Site</h1>
        <div className="product-grid">
          {products.map(product => (
              <Product key={product.id} product={product} currentUser={currentUser}
            />
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
