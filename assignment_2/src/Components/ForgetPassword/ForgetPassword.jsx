import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserToken } from "../Context/UserToken";
import ResetCode from "../ResetCode";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  // vars
  let navigate = useNavigate();
  let [error, setError] = useState("");
  let [message, setMessage] = useState("");
  let [loading, setLoading] = useState(false);
  

  async function submitForget(values) {
    setLoading(true);
    console.log(values);
    let { data } = await axios
      .post(`${process.env.REACT_APP_BaseUrl}/api/v1/auth/forgotPasswords`, values)
      .catch((err) => {
        setLoading(false);
        // console.log(err);
        // console.log(err.response.data.message);
        setError(err.response.data.message);
        setMessage("");
      });
    console.log(data);
    if (data.statusMsg === "success") {
      setMessage(data.message);
      setError("");
      setLoading(false);
      navigate("/resetCode");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required.")
      .email("Email is not valid."),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: submitForget,
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

          {/* success message unhandled */}
          {/* <p className="alert alert-success my-3">{message}</p> */}

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

          {/* submit button */}
          {loading ? (
            <button className="btn btn-success border-0 bg-main mb-3 d-block mx-auto">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-success border-0 bg-main mb-3 d-block mx-auto"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Reset
            </button>
          )}
          {/* {message ? <ResetCode/> : ""} */}
        </form>
      </div>
    </>
  );
}
