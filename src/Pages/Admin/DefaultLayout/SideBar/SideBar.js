
import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.scss';
import { AdminPath } from '../../../../Routes/routerList';

function SideBar({ sidebarVisible, toggleSidebar }) {
    return (
        <div className={`sidebar ${sidebarVisible ? '' : 'collapsed'}`}>
        <Link to={AdminPath.MainLayout}>Statistic</Link>
        <Link to={AdminPath.UserList}>User</Link>
        <Link to={AdminPath.Image}>Image</Link>
        <Link to={AdminPath.Product}>Product</Link>    
        <Link to={AdminPath.Order}>Order</Link>    
        <button onClick={toggleSidebar}>Toggle Sidebar</button>
    </div>
    );
}

export default SideBar;
