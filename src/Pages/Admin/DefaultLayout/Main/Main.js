import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../Header/AdminHeader';
import SideBar from '../SideBar/SideBar';
import { useLocation } from 'react-router-dom';
import './Main.scss';
import DataAnalytic from '../../DataAnalytic/DataAnalytic';
import ListUser from '../../List/ListUser';
import { auto } from '@popperjs/core';
import ImageSize from '../../Image/Size/ImageSize';

function Main(props) {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [content, setContent] = useState();
    const location = useLocation();

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    useEffect(() => {
        switch(location.pathname) {
            case '/admin_dashboard/user':
                setContent(<ListUser/>);
                break;
            case '/admin_dashboard/product':
                setContent('Product content');
                break;
            case '/admin_dashboard/image/size':
                setContent(<ImageSize/>);
                break;
            default:
                setContent(<DataAnalytic/>);
        }
    }, [location.pathname]);

    return (
        <div className="dashboard-container">
            {sidebarVisible && <SideBar/>}
            <button style={{height : 40, margin: 'auto'}} onClick={toggleSidebar}>Ra</button>
            <div className="content-wrapper">
                <div className="main-content">
                    <HeaderAdmin/>
                    <div className="dashboard-links">
                        {/* Links */}
                    </div>
                    <div className="dashboard-widgets">
                        {/* Render content */}
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
