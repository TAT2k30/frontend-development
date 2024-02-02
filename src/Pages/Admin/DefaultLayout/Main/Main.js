// Main.jsx
import React, { useState } from 'react';
import HeaderAdmin from '../Header/HeaderAdmin';
import SideBar from '../SideBar/SideBar';
import { Link } from 'react-router-dom';
import './Main.scss';
import ListUser from '../../List/ListUser';
import { auto } from '@popperjs/core';

function Main(props) {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    return (

        <div className="dashboard-container">
            {sidebarVisible && <SideBar/>}
           <button style={{height : 40, margin: auto}} onClick={()=>{toggleSidebar()}}>Ra</button>
            <div className="content-wrapper">
            
                <div className="main-content">
                <HeaderAdmin/>
                    <div className="dashboard-links">
                        <Link to="/admin/dashboard">Dashboard</Link>
                        <Link to="/admin/users">Users</Link>
                        <Link to="/admin/products">Products</Link>
                    </div>
                    <div className="dashboard-widgets">
                        <ListUser/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
