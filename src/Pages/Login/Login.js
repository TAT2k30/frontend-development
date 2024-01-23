import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../Assets/Data/DataContext';
import { getItem } from '../../Services/apiService';
function Login(props) {
    const [user, setUser] = useState({ email: "", password: "" });
    const { login } = useContext(DataContext);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.email && user.password) {
            await axios.post("http://localhost:5085/api/Auth", user)
                .then(res => {
                    if (res.status === 200) {
                        let tokenString = res.data.token;
                        console.log("Undecoded token: ", tokenString);
                        login(tokenString);
                    }
                })
                .catch(error => {
                    if (error.status === 404) {
                        alert("Invalid creadentials")
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
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={handleChangeInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="password" onChange={handleChangeInput} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div>
                <button onClick={getItem} className='btn btn-primary'>Get all users informations</button>
            </div>
        </div>

    );
}

export default Login;
