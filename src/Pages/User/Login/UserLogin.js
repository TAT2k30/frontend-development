import axios from "axios";
import React, { useContext, useState } from "react";
import { DataContext } from "../../../Assets/Data/DataContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./UserLogin.scss";
import { baseUrl } from "../../../Assets/Data/baseUrl";
import { Link } from "react-router-dom";

function UserLogin(props) {

  const { login } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Your password must be at least 8 characters")
        .matches(/[a-z]/i, "Your password must contain at least one letter.")
        .matches(/[0-9]/, "Your password must contain at least one digit.")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setError(null);
      setLoading(true);

      try {
        const response = await axios.post(
          `${baseUrl}/Auth/login`,
          values
        );
        const tokenString = response.data.token;
        login(tokenString);
      } catch (error) {
        console.log(error);
        if (error.response) {
          if (error.response.status === 404) {
            setError("Invalid credentials");
          } else {
            setError("An error occurred while processing your request");
          }
        } else {
          setError("Network error");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="user-login-form">
      <div className="checkout-section">
        <div className="checkout-heading">Previous Logins</div>
 
        <div className="checkout-card">
          <p>Email: example@email.com</p>
          <p>Last Login: 2022-02-02 10:30 AM</p>
        </div>

      </div>

      <div className="login-container">
        <div className="login-form-inner">
          <h2>Login</h2>
          <form onSubmit={formik.handleSubmit}>
            {error && (
              <div className="alert" role="alert">
                {error}
              </div>
            )}
            <div className="mb-3 mt-3">
             
                <b>Email:</b>
             
              <input
                type="text"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                id="email"
                placeholder="Enter email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              
                <b>Password:</b>
                <Link className="forgot-passowrd-text">Forgot passowrd</Link>
              <input
                type="password"
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                id="password"
                placeholder="Enter password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="missing-account-text">
             <Link to="/signup">Don't have an account?</Link>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Submit"
              )}
              
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
