import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserToken } from "../Context/UserToken";
import { Helmet } from "react-helmet";

export default function Login() {
  // vars
  let navigate = useNavigate();
  let { setIsLogin } = useContext(UserToken);
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  

  async function submitLogin(values) {
    setLoading(true);
    console.log(values);
    let { data } = await axios
      .post(`${process.env.REACT_APP_BaseUrl}/api/v1/auth/signin`, values)
      .catch((err) => {
        setLoading(false);
        // console.log(err);
        // console.log(err.response.data.message);
        setError(err.response.data.message);
      });
    // console.log(data);
    if (data.message === "success") {
      setError("");
      setLoading(false);
      // token
      localStorage.setItem("userToken", data.token);
      setIsLogin(data.token);
      navigate("/cart");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required.")
      .email("Email is not valid."),
    password: Yup.string()
      .required("Password is required.")
      .matches(
        /^[A-Z][a-z0-9]{4,10}$/,
        "Password must start with Capital letter and from 5 to 10 characters"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="container">
        <form className="w-75 mx-auto my-5" onSubmit={formik.handleSubmit}>
          {error ? <p className="alert alert-danger my-3">{error}</p> : ""}

          {/* email */}
          <label htmlFor="email">Email: </label>
          <input
            onBlur={formik.handleBlur}
            type="email"
            className="form-control mb-3"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="alert alert-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}
          {/* password */}
          <label htmlFor="password">Password: </label>
          <input
            onBlur={formik.handleBlur}
            type="password"
            className="form-control mb-3"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="alert alert-danger">{formik.errors.password}</p>
          ) : (
            ""
          )}

          {/* submit button */}
          <div className="loginBtns d-flex justify-content-between align-items-center">
            {/* <Link to="/forgetPass" type="submit" className="nav-link mb-3">
              Forget Password?<span className="link-info"> Click here</span>
            </Link> */}
            {loading ? (
              <button className="btn btn-success border-0 bg-main mb-3 d-block ms-auto">
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success border-0 bg-main mb-3 d-block ms-auto"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
