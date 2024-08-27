import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log('Search query:', searchQuery); 
    if (searchQuery.trim() !== '') {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="search-bar search-bar-container">
      <input
        type="text"
        placeholder="Search for items..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearchSubmit}>Search</button>
    </div>
  );
};

export default SearchBar;
