import React, { useState } from 'react';
import './UserSearchBar.scss';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function UserSearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="user-search-bar-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{width: 400}}
      />
      <FontAwesomeIcon onClick={handleSearch} icon={faMagnifyingGlass} className='user-search-icon'/>
    </div>
  );
}

export default UserSearchBar;
