import React, { useCallback, useEffect, useState } from 'react';
import './UserMain.scss';
import { useLocation } from 'react-router-dom';
import Header from '../Header/UserHeader';
import Footer from '../Footer/UserFooter';
import { UserPath } from '../../../../Routes/routerList';
import Content from '../Content/UserContent';
import UserDetail from '../../UserDetail/UserDetail';
import Login from '../../Login/UserLogin';
import SignUp from '../../SignUp/UserSignUp';
import Create from '../../Create/UserCreateImage';
import Print from '../../ProductPages/Prints/Print';
import PrintSetting from '../../ProductPages/Prints/PrinttingDetails/PrintSetting.js';

function UserMain(props) {
    const [content, setContent] = useState(null);
    const [showShadow, setShowShadow] = useState(window.scrollY > 0);
    const location = useLocation();

    const handleNavigation = useCallback(() => {
        setShowShadow(window.scrollY > 0);
    }, []);

    useEffect(() => {
        switch (location.pathname) {
            case UserPath.MainLayout:
                setContent(<Content />);
                break;
            case UserPath.Detail:
                setContent(<UserDetail />);
                break;
            case UserPath.Login:
                setContent(<Login />);
                break;
            case UserPath.SignUp:
                setContent(<SignUp />);
                break;
            case UserPath.Upload:
                setContent(<Create />);
                break;
            case UserPath.ProductPrint:
                setContent(<Print />);
                break;
            case UserPath.ProductPrintSetting:
                setContent(<PrintSetting />);
                break;
            default:
                setContent(<Content />);
        }
    }, [location.pathname]);

    useEffect(() => {
        window.addEventListener("scroll", handleNavigation);
        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);

    return (
        <div className={`user-container`}>
            <div className='user-header' style={showShadow ? { 'boxShadow': '0 0 10px rgba(0, 0, 0, 0.2)', 'backgroundColor': '#eed9cbe8' } : {}} >
                <Header />
            </div>
            <div className='user-main-content'>
                {content}
            </div>
            <div className='user-footer'>
                <Footer />
            </div>
        </div>
    );
}

export default UserMain;
