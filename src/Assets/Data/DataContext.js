import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./baseUrl";

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
        if (decodeToken.Role === "Admin") {
            setToken(decodeToken);
            navigate("/list");
        } else {
            navigate("/login");
        }
    }

    const logout = async (email) => {
        try {
            const response = await axios.post(
                `${baseUrl}/Auth/logout`,
                `"${email}"`,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                localStorage.removeItem("token");
                setToken("");
                navigate("/login");
            } else {
                console.error('Logout failed:', response.data);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    /*
    ==> User controller
    */
    const [userList, setUserList] = useState([]);

    const deleteUserById = async (id) => {
        try {
             await axios.delete(`${baseUrl}/User/${id}`);
             setUserList((prevUserList) => prevUserList.filter((user) => user.id !== id))
        } catch (err) {
            console.log("Error deleting: ", err)
        }
    }

    const getAllAccounts = async () => {
        try {
            const response = await axios.get(`${baseUrl}/User`);
            setUserList(response.data);
        } catch (error) {
            console.log("Error: ", error);
        }
    }




    let values = {
        token,
        setToken,
        login,
        logout,
        deleteUserById,
        getAllAccounts,
        userList,
        navigate
        
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
