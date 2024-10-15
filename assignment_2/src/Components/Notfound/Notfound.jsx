import React from 'react'
import not from "../../assets/error.svg"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Notfound() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Notfound x_x</title>
      </Helmet>
      <div className='w-50 mx-auto text-center my-3'>
          <LazyLoadImage src={not} alt="error" className='w-50' />
          <h3 className='my-3 fw-bolder text-notFound'>Page Not Found</h3>
          <button className='btn btn-success'>
            <Link to='/' className='nav-link'>Home</Link>
          </button>
          <Outlet/>
      </div>
    </>
  )
}
