import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { privateRouter, publicRouter } from './Routes/routerList';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';


function App() {
  const tokenLocal = localStorage.getItem("token");
  const decodedToken = tokenLocal ? jwtDecode(tokenLocal) : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (tokenLocal === null || tokenLocal === "") {
      navigate("/login");
    }
  }, [navigate, tokenLocal]);
  return (
    
    <div className="container">
      <Routes>  
      {publicRouter.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            element={
              tokenLocal ? (
                <div>You are already logged in!</div>
              ) : (
                item.element
              )
            }
          />
        ))}
        {privateRouter.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            element={
              decodedToken && decodedToken.Role === "Admin" ? (
                item.element
              ) : (
                <Navigate to="/create" />
              )
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
