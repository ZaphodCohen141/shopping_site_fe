import React, { useEffect, useState } from 'react';
import { getProductsByNumber, updateProductImageUrl } from '../../services/api';
import Product from '../product/Product';
import './MainPage.css';

const MainPage = ({ items, currentUser, onLogout }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (items.length === 0) {
      getProductsByNumber(6)
        .then(async (res) => {
          const productsData = res.data;

          // Check for missing images and update if necessary
          const updatedProducts = await Promise.all(
            productsData.map(async (product) => {
              if (!product.imageUrl) {
                // Update the product image URL if missing
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

  return (
    <div className="main-page">
      <header className="navbar">
        <button className="shop-logo" onClick={() => window.location.href = '/'}>
          ShopLogo
        </button>
        <nav>
          <ul>
            <li><button>Orders</button></li>
            <li><button>Favorites</button></li>
            {currentUser ? (
              <>
                <li><span>Welcome, {currentUser.firstName}</span></li>
                <li><button onClick={onLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><button onClick={() => window.location.href = '/login'}>Login</button></li>
                <li><button onClick={() => window.location.href = '/register'}>Sign Up</button></li>
              </>
            )}
          </ul>
        </nav>
      </header>

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
