import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function Register() {

  // vars
  let navigate = useNavigate()

  let [error, setError] = useState('')
  let [loading, setLoading] = useState(false)

  async function submitRegister(values){
    setLoading(true)
    console.log(values);
    let data = await axios.post(`${process.env.REACT_APP_BaseUrl}/api/user`, values).catch((err)=>{
      setLoading(false)
      setError(err.response.data.title)
    })

    console.log(data);
    if(data.status >= 200 && data.status <= 210){
      setError('')
      setLoading(false)
      navigate("/login")
    }
    
  }

  const validationSchema = Yup.object({
    name:Yup.string().min(2, 'Min length is 2 characters').max(7, 'Max length is 7 characters').required('Name is required.'),
    email:Yup.string().required('Email is required.').email("Email is not valid."),
    password: Yup.string().required('Password is required.').matches(/^[A-Z][a-z0-9]{5,10}$/,"Password must start with Capital letter and from 6 to 10 characters"),
    rePassword: Yup.string().required('Password is required again.').oneOf([Yup.ref('password')],"Password is not matching."),
    phone: Yup.string().matches(/^(002)?01[0-25][0-9]{8}$/,"Not a Valid Phone number.").required("Phone is required.")
  })

  //to get data needed for backend
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: submitRegister
  })

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="container">
        <form className='w-75 mx-auto my-5' onSubmit={formik.handleSubmit}>
          {error?<p className='alert alert-danger my-3'>{error}</p>: ''}

          {/* name */}
          <label htmlFor="name">Name: </label>
          <input onBlur={formik.handleBlur} type="text" className='form-control mb-3' id='name' name='name' onChange={formik.handleChange} value={formik.values.name}/>
          {formik.errors.name && formik.touched.name?<p className='alert alert-danger'>{formik.errors.name}</p>:''}
          
          {/* email */}
          <label htmlFor="email">Email: </label>
          <input onBlur={formik.handleBlur} type="email" className='form-control mb-3' id='email' name='email' onChange={formik.handleChange} value={formik.values.email}/>
          {formik.errors.email && formik.touched.email?<p className='alert alert-danger'>{formik.errors.email}</p>:''}

          {/* password */}
          <label htmlFor="password">Password: </label>
          <input onBlur={formik.handleBlur} type="password" className='form-control mb-3' id='password' name='password' onChange={formik.handleChange} value={formik.values.password}/>
          {formik.errors.password && formik.touched.password?<p className='alert alert-danger'>{formik.errors.password}</p>:''}
          
          {/* repassword */}
          <label htmlFor="rePassword">rePassword: </label>
          <input onBlur={formik.handleBlur} type="password" className='form-control mb-3' id='rePassword' name='rePassword' onChange={formik.handleChange} value={formik.values.rePassword}/>
          {formik.errors.rePassword && formik.touched.rePassword?<p className='alert alert-danger'>{formik.errors.rePassword}</p>:''}
          
          {/* phone */}
          <label htmlFor="phone">Phone: </label>
          <input onBlur={formik.handleBlur} type="tel" className='form-control mb-3' id='phone' name='phone' onChange={formik.handleChange} value={formik.values.phone}/>
          {formik.errors.phone && formik.touched.phone?<p className='alert alert-danger'>{formik.errors.phone}</p>:''}

          {/* submit button */}
          {loading?<button className='btn btn-success border-0 bg-main mb-3 d-block ms-auto' >
            <i className='fa-solid fa-spinner fa-spin'></i>
          </button>:<button type='submit' className='btn btn-success border-0 bg-main mb-3 d-block ms-auto' disabled={!(formik.isValid && formik.dirty)}>Register</button>}
        </form>
      </div>
    </>
  )
}
