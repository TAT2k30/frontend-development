import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { privateRouter, publicRouter } from './Routes/routerList';
import { jwtDecode } from 'jwt-decode';
import { DataContext } from './Assets/Data/DataContext';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const decodedToken = token ? jwtDecode(token) : null;
  const location = useLocation();
  const {currentRoute, setCurrentRoute} = useContext(DataContext);
  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);
  console.log(currentRoute);
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
                  <Navigate to={currentRoute}/>
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
