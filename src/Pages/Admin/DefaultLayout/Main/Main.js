// Main.jsx
import React from 'react';
import Header from '../Header/HeaderAdmin';
import SideBar from '../SideBar/SideBar';
import { Link } from 'react-router-dom';
import './Main.scss';
import ListUser from '../../List/ListUser';

function Main(props) {
    return (
        <div className="dashboard-container">
            <Header />
            <div className="content-wrapper">
                <SideBar />
                <div className="main-content">
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
