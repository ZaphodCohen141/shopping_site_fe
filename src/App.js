import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/mainpage/MainPage';
import ProductList from './components/product/ProductList';
import ProductDetails from './components/product/ProductDetails';
import LoginForm from './components/user/LoginForm';
import RegistrationForm from './components/user/RegistrationForm';
import UserPage from './components/user/UserPage';
import ShoppingCart from './components/shoppingcart/ShoppingCart';

function App() {
  const [filteredItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage items={filteredItems} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/userPage" element={<UserPage currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/shoppingcart" element={<ShoppingCart currentUser={currentUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
