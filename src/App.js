import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { privateRouter, publicRouter } from './Routes/routerList';
import { jwtDecode } from 'jwt-decode';
import HeaderAdmin from './Pages/Admin/DefaultLayout/Header/AdminHeader';
import Header from './Pages/User/DefaultLayout/Header/UserHeader';
import Footer from './Pages/User/DefaultLayout/Footer/UserFooter';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const decodedToken = token ? jwtDecode(token) : null;
  const location = useLocation();
  const isAdmin = decodedToken?.Role === 'Admin';
 

  
  return (
    <div>
     
      <Routes>
        {publicRouter.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
        {decodedToken ? (
          privateRouter.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              element={
                decodedToken.Role === 'Admin' && token ? (
                  item.element
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          ))
        ) : null}
      </Routes>
    
    </div>
  );
}

export default App;
