import React, { useContext, useState } from "react";
import { DataContext } from "../../../Assets/Data/DataContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "../../../Assets/Data/baseUrl";

import "./SignUp.scss";

function SignUp() {
  const { login } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      gender: "",
      dateOfBirth: "",
      userName: "",
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
      gender: Yup.string().required("Gender is required"),
      dateOfBirth: Yup.date().required("Date of Birth is required"),
      userName: Yup.string().required("Username is required"),
    }),
    onSubmit: async (values) => {
      setError(null);
      setLoading(true);

      try {
        const response = await axios.post(
          `${baseUrl}/Auth/register`,
          values
        );
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
    <div className="signup-background">
      <div className="signup-form">
        <div className="registration-container">
          <form onSubmit={formik.handleSubmit}>
            {error && (
              <div className="alert" role="alert">
                {error}
              </div>
            )}

            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">
                <b>Email:</b>
              </label>
              <input
                type="text"
                className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""
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
              <label htmlFor="gender" className="form-label">
                <b>Gender:</b>
              </label>
              <select
                className={`form-control ${formik.touched.gender && formik.errors.gender ? "is-invalid" : ""
                  }`}
                id="gender"
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
              >
                <option value="">Choose gender</option>
                <option value={true}>Male</option>
                <option value={false}>Female</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className="invalid-feedback">{formik.errors.gender}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label">
                <b>Date of Birth:</b>
              </label>
              <input
                type="date"
                className={`form-control ${formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? "is-invalid"
                    : ""
                  }`}
                id="dateOfBirth"
                name="dateOfBirth"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <div className="invalid-feedback">{formik.errors.dateOfBirth}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                <b>Username:</b>
              </label>
              <input
                type="text"
                className={`form-control ${formik.touched.userName && formik.errors.userName
                    ? "is-invalid"
                    : ""
                  }`}
                id="userName"
                placeholder="Enter username"
                name="userName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
              />
              {formik.touched.userName && formik.errors.userName && (
                <div className="invalid-feedback">{formik.errors.userName}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <b>Password:</b>
              </label>
              <input
                type="password"
                className={`form-control ${formik.touched.password && formik.errors.password
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
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>

            <div className="register">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
