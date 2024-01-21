import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataContext = createContext();
function DataProvider({ children }) {
    let tokenLocal = localStorage.getItem("token");
    const [token, setToken] = useState(jwtDecode(tokenLocal)||"");
    const navigate = useNavigate();
    const logIn = (tokenString) =>{
        localStorage.setItem("token", tokenString);
        const decodeToken = jwtDecode(tokenString);
        if(decodeToken.Role == "Admin" || decodeToken.Role == "User"){
           navigate("/list");
        }else{
            navigate("/login");
        }
    }
    const logOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    let values = {
        token,
        logIn,
        logOut,
        setToken
    }
    return (
        <div>
            <DataContext.Provider value={values}>
                {children}
            </DataContext.Provider>
        </div>
    );
}


export {
    DataContext,
    DataProvider
};