import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../Assets/Data/DataContext';
import './Header.css';



function Header() {
    const { token, logout } = useContext(DataContext);
    return (
        <div className="header-container">
            <div className="left-links">
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
            </div>
            <div className="right-info">
                {token ? (
                    <div>
                        <span>Welcome, {token.UserName}</span>
                        <img src={token.AvatarUrl} width={50} className='imgAvatar' alt="User Avatar" />

                        <button onClick={() => { logout(token.Email) }} className='btn btn-warning'>Logout</button>
                    </div>
                ) : (
                    <div>
                        <Link to="/login">Login</Link>&nbsp;&nbsp;&nbsp;
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
