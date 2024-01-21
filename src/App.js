import { Navigate, Route, Routes } from "react-router-dom";
import { privateRouter, publicRouter } from "./Routes/routerList";

function App() {
  return (
    <div style={{ padding: 35 }}>
      <Routes>
        {publicRouter.map((item, index) => {
          return (
            <Route key={index} path={item.path} element={item.element}></Route>
          )})}
        {privateRouter.map((item, index) => {
          if (item.roles.include("Admin")) {
            return (
              <Route key={index} path={item.path} element={item.element}></Route>
            )
          } else {
            return <Route path="*" element={<Navigate to="/login" />}></Route>
          }})}
      </Routes>
    </div>
  );
}

export default App;
