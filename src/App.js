import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { privateRouter, publicRouter } from './Routes/routerList';
import { jwtDecode } from 'jwt-decode';
import Header from './Pages/Admin/DefaultLayout/Header/Header';
import Footer from './Pages/User/DefaultLayout/Footer/Footer';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const decodedToken = token ? jwtDecode(token) : null;
  const location = useLocation();
  const isAdmin = decodedToken?.Role === 'Admin';

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    const currentPath = location.pathname;

    if (currentPath === '/signup') {
      const gradientColor1 = 'rgb(120, 120, 240)';
      const gradientColor2 = 'rgb(240, 120, 120)';
      const gradient = `linear-gradient(to right, ${gradientColor1}, ${gradientColor2})`;
      
      document.body.style.background = gradient;
    } else {
      document.body.style.background = ''; // Đặt lại màu nền khi không phải '/signup'
    }

    return () => {
      document.body.style.backgroundColor = ''; // Đặt lại màu nền khi component unmount
    };
  }, [location.pathname]);

  return (
    <div>
      {!isAdmin && <Header />}
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
                decodedToken.Role === 'Admin' ? (
                  item.element
                ) : (
                  <Navigate to="/create" />
                )
              }
            />
          ))
        ) : null}
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
