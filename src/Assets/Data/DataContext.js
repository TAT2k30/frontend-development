import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

function DataProvider({ children }) {
    /* 
    ==> Token service
    */
    let tokenLocal = localStorage.getItem("token");
    const [token, setToken] = useState(tokenLocal ? jwtDecode(tokenLocal) : "");
    const navigate = useNavigate();
    /* 
    ==> Authenication service
    */
    const login = (tokenString) => {
        localStorage.setItem("token", tokenString);
        const decodeToken = jwtDecode(tokenString);
        console.log("Decoded token: ", decodeToken);
        alert(`Login successfull, welcome ${decodeToken.UserName}`)
        if (decodeToken.Role === "Admin") {
            navigate("/list");
        } else {
            navigate("/login");
        }
    }
    
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    let values = {
        token,
        setToken,
        login,
        logout
    }

    return (
        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    );
}

export {
    DataContext,
    DataProvider
};
