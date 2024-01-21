import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../Assets/Data/DataContext';

function Login(props) {
    const [user, setUser] = useState({ name: "", password: "" });
    const {login} = useContext(DataContext);
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.email && user.password) {
            axios.post("http://localhost:5157/api/Auth", user)
                .then(res => {
                    if (res.status === 200) {
                        let tokenString = res.data.token;
                        login(tokenString);
                    }
                })
                .catch(error => {
                    if (error.status === 404) {
                        console.log("Invalid credentials")
                    } else {
                        console.log("Something went wrong: ", error)
                    }
                })
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label for="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={handleChangeInput} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" onChange={handleChangeInput} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Login;