import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function ResetCode() {
  let navigate = useNavigate();
  let [error, setError] = useState("");
  // let [message, setMessage] = useState("");
  let [loading, setLoading] = useState(false);
  

  async function verifyCode(values) {
    setLoading(true);
    console.log(values);
    let { data } = await axios
      .post(`${process.env.REACT_APP_BaseUrl}/api/v1/auth/verifyResetCode`, values)
      .catch((err) => {
        setLoading(false);
        // console.log(err);
        // console.log(err.response.data.message);
        setError(err.response.data.message);
        //   setMessage("")
      });
    if (data.status === "Success") {
      console.log(data);
      //   setMessage(data.message)
      setError("");
      setLoading(false);
      navigate("/resetPass");
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verifyCode,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
      </Helmet>
      <div className="container my-5">
        <form
          onSubmit={formik.handleSubmit}
          className="card shadow d-flex justify-content-evenly align-items-center p-3"
        >
          <p>Enter code: </p>
          <input
            type="text"
            className="form-control w-50 mb-3"
            onChange={formik.handleChange}
            value={formik.values.resetCode}
            name="resetCode"
          />
          {loading ? (
            <button className="btn btn-success border-0 bg-main mb-3 d-block mx-auto">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-success border-0 bg-main mb-3 d-block mx-auto"
            >
              Submit Code
            </button>
          )}
          {error ? <p className="alert alert-danger my-3">{error}</p> : ""}
        </form>
      </div>
    </>
  );
}
