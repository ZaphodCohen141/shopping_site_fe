import React, { useState } from 'react';
import './Navbar.css';
import UserStatus from '../user/UserStatus';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/api'; 

const NavBar = ({ currentUser, onLogout, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleShoppingCartClick = () => {
    navigate('/shoppingCart', { state: { username: currentUser.username } });
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signUp');
  };

  const handleLogout = async () => {
    if (currentUser) {
      try {
          const response = await logoutUser(currentUser.username);
          onLogout();
          navigate('/'); 
      } catch (error) {
          console.error('Error during logout:', error.message);
      }
    }
  };
  

  let navItems;

  if (currentUser) {
    navItems = (
      <>
        <li>
          <Link to="/userPage">
            <UserStatus username={currentUser.username} />
          </Link>
        </li>
        <li><button onClick={handleShoppingCartClick}>Shopping Cart</button></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </>
    );
  } else {
    navItems = (
      <>
        <li><button onClick={handleLoginClick}>Login</button></li>
        <li><button onClick={handleSignUpClick}>Sign Up</button></li>
      </>
    );
  }

  return (
    <header className="navbar">
      <button className="shop-logo" onClick={handleLogoClick}>
        Le MagnifiSite
      </button>
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </div>
      <nav>
        <ul>
          {navItems}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
