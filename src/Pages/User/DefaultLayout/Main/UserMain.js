import React, { useEffect, useState } from 'react';
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

function UserMain(props) {
    const [content, setContent] = useState(null);
    const [showShadow, setShowShadow] = useState(false); 
    const location = useLocation();

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
            default:
                setContent(<Content />);
        }
    }, [location.pathname]);

   
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 10) { 
                setShowShadow(true);
            } else {
                setShowShadow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
<div className={`user-container`} style={showShadow ? { boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" } : {}}>

            <div className='user-header'>
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
