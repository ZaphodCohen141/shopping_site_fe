import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/mainpage/MainPage';
import ProductList from './components/product/ProductList';
import ProductDetails from './components/product/ProductDetails';
import LoginForm from './components/user/LoginForm';
import RegistrationForm from './components/user/RegistrationForm';
import UserPage from './components/user/UserPage';
import ShoppingCart from './components/shoppingcart/ShoppingCart';
import PrevOrder from './components/orders/PrevOrder';

function App() {
  const [filteredItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setLoading(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  const handleSearch = (searchQuery) => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage items={filteredItems} currentUser={currentUser} onLogout={handleLogout} onSearch={handleSearch} />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails currentUser={currentUser} onLogout={handleLogout} onSearch={handleSearch} />} />
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/userPage" element={currentUser ? <UserPage currentUser={currentUser} onLogout={handleLogout} onSearch={handleSearch} /> : <LoginForm onLogin={handleLogin} />} />
          <Route path="/shoppingcart" element={currentUser ? <ShoppingCart currentUser={currentUser} /> : <LoginForm onLogin={handleLogin} />} />
          <Route path="/prevOrders" element={currentUser ? <PrevOrder userId={currentUser.id} /> : <LoginForm onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
