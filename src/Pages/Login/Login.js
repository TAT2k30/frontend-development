import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../Assets/Data/DataContext';

function Login(props) {
    const [user, setUser] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const { login } = useContext(DataContext);
    const [error, setError] = useState(null);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (user.email && user.password) {
            try {
                const response = await axios.post("http://localhost:5085/api/Auth", user);
                const tokenString = response.data.token;
                console.log("Undecoded token: ", tokenString);
                login(tokenString);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError("Invalid credentials");
                } else {
                    console.log("Something went wrong: ", error);
                }
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={handleChangeInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="password" onChange={handleChangeInput} />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default Login;
