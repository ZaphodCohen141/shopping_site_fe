import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { searchProducts } from './services/api';
import MainPage from './components/mainpage/MainPage';
import SearchBar from './components/mainpage/SearchBar';
import ProductList from './components/product/ProductList';
import ProductDetails from './components/product/ProductDetails';
import LoginForm from './components/user/LoginForm'; // Import LoginForm
import RegistrationForm from './components/user/RegistrationForm'; // Import RegistrationForm

function App() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSearch = (query) => {
    searchProducts(query)
      .then((res) => {
        console.log('Search response:', res.data);
        setFilteredItems(res.data);
      })
      .catch((err) => console.error('Search API error:', err.message));
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="App">
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<MainPage items={filteredItems} currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
