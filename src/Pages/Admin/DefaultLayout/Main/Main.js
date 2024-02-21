// Main.jsx
import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../Header/AdminHeader';
import SideBar from '../SideBar/SideBar';
import { useLocation } from 'react-router-dom';
import './Main.scss';
import DataAnalytic from '../../DataAnalytic/DataAnalytic';
//User
import ListUser from '../../List/ListUser';
//Image
import ImageSize from '../../Image/Size/ImageSize';
import Image from '../../Image/Image';
//Product
import Product from '../../Product/Product';


function Main(props) {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [content, setContent] = useState();
    const location = useLocation();

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    useEffect(() => {
        switch (location.pathname) {
            case '/admin_dashboard/user':
                setContent(<ListUser />);
                break;
            case '/admin_dashboard/image':
                setContent(<Image/>);
                break;
            case '/admin_dashboard/product':
                setContent(<Product />);
                break;
            default:
                setContent(<DataAnalytic />);
        }
    }, [location.pathname]);

    return (
        <div className={`dashboard-container ${sidebarVisible ? '' : 'collapsed'}`}>
            <SideBar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
            <div className="content-wrapper">
                <div className="main-content">
                    <HeaderAdmin toggleSidebar={toggleSidebar} />
                    <div className="dashboard-links">
                    </div>
                    <div className="dashboard-widgets">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
