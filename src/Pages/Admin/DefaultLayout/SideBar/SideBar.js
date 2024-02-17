
import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.scss';

function SideBar() {
    return (
        <div className="sidebar">
            <Link to="/admin_dashboard">Dashboard</Link>
            <Link to="/admin_dashboard/user">Users</Link>
            <Link to="/admin_dashboard/image/size">Image size</Link>
        </div>
    );
}

export default SideBar;
