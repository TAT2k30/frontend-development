import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../../Assets/Data/DataContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./Login.scss"

function Login(props) {
  const { login } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string()
        .min(8, 'Your password must be at least 8 characters')
        .matches(/[a-z]/i, 'Your password must contain at least one letter.')
        .matches(/[0-9]/, 'Your password must contain at least one digit.')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setError(null);
      setLoading(true);

      try {
        const response = await axios.post("http://localhost:5085/api/Auth/login", values);
        const tokenString = response.data.token;
        console.log("Undecoded token: ", tokenString);
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
    <div className='login-form'>
        <div style={{}}>Check out your revious login</div>
    <div className="login-container">
      <form onSubmit={formik.handleSubmit}>
        {error && <div className="alert" role="alert">{error}</div>}
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label"><b>Email:</b></label>
          <input
            type="text"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            id="email"
            placeholder="Enter email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"><b>Password:</b></label>
          <input
            type="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            id="password"
            placeholder="Enter password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && <div className="invalid-feedback">{formik.errors.password}</div>}
        </div>
        <a href="/register">Don't have an account?</a>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Submit"}
        </button>
      </form>
    </div>
    </div>
  );
}

export default Login;
