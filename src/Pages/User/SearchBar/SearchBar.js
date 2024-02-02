import React, { useState } from 'react';
import './SearchBar.scss';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{width: 400}}
      />
      <button onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
    </div>
  );
}

export default SearchBar;
