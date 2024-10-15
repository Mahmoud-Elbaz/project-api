import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetPass() {
  // vars
  let navigate = useNavigate();
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  

  async function submitResetPass(values) {
    setLoading(true);
    console.log(values);
    let { data } = await axios
      .put(`${process.env.REACT_APP_BaseUrl}/api/v1/auth/resetPassword`, values)
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
    // console.log(data);
    // if (data.message === "success") {
    //   setError("");
    //   setLoading(false);
    // }
    navigate("/login");
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required.")
      .email("Email is not valid."),
    newPassword: Yup.string()
      .required("Password is required.")
      .matches(
        /^[A-Z][a-z0-9]{4,10}$/,
        "Password must start with Capital letter and from 5 to 10 characters"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: submitResetPass,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
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
          {/* newPassword */}
          <label htmlFor="newPassword">New Password: </label>
          <input
            onBlur={formik.handleBlur}
            type="password"
            className="form-control mb-3"
            id="newPassword"
            name="newPassword"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <p className="alert alert-danger">{formik.errors.newPassword}</p>
          ) : (
            ""
          )}

          {/* submit button */}
          <div className="ResetPassBtns d-flex justify-content-between align-items-center">
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
                Send
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
