
import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.scss';

function SideBar() {
    return (
        <div className="sidebar">
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/products">Products</Link>
        </div>
    );
}

export default SideBar;
