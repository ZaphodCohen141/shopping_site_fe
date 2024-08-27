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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for items..."
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress} 
      />
      <button onClick={handleSearchSubmit}>Search</button>
    </div>
  );
};

export default SearchBar;
