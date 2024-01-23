import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRouter, publicRouter } from './Routes/routerList';
import { jwtDecode } from 'jwt-decode';

function App() {
  const tokenLocal = localStorage.getItem("token");
  const decodedToken = jwtDecode(tokenLocal);
  return (
    <div className="container">
      <Routes>
        {publicRouter.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
        {privateRouter.map((item, index) => (
          decodedToken.Role == "Admin" ? (
            <Route key={index} path={item.path} element={item.element} />
          ) : (
            <Route key={index} path='*' element={<Navigate to="/create" />} />
          )
        ))}
      </Routes>
    </div>
  );
}

export default App;
