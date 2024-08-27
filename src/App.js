import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/mainpage/MainPage';
import ProductList from './components/product/ProductList';
import ProductDetails from './components/product/ProductDetails';
import LoginForm from './components/user/LoginForm'; // Import LoginForm
import RegistrationForm from './components/user/RegistrationForm'; // Import RegistrationForm

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
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
