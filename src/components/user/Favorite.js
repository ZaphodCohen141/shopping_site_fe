import React, { useEffect, useState } from 'react';
import { getFavoriteProducts, removeFavorite } from '../../services/api';

const Favorite = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavoriteProducts(userId)
      .then(res => setFavorites(res.data))
      .catch(err => console.error('Error getting favorites:', err.message));
  }, [userId]);

  const handleRemoveFavorite = productId => {
    removeFavorite(userId, productId)
      .then(() => setFavorites(favorites.filter(product => product.id !== productId)))
      .catch(err => console.error('Error removing favorite:', err.message));
  };

  return (
    <div className="favorite-container">
      {favorites.map(product => (
        <div key={product.id} className="favorite-item">
          <p>{product.productName}</p>
          <button onClick={() => handleRemoveFavorite(product.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Favorite;
