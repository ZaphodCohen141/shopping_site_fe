import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrevOrder from '../orders/PrevOrder';
import Favorite from './Favorite';
import { logoutUser } from '../../services/api';

const UserPage = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser(currentUser.username); 
      onLogout();  
      navigate('/'); 
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  

  if (!currentUser) {
    return null; 
  }

  return (
    <div className="user-page-container">
      <h1>Welcome, {currentUser.firstName}</h1>
      <button onClick={handleLogout}>Log Off</button>
      <PrevOrder userId={currentUser.id} />
      <h2>Your Favorites</h2>
      <Favorite userId={currentUser.id} />
    </div>
  );
};

export default UserPage;
