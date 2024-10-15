import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, Outlet } from 'react-router-dom'

export default function Orders() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Orders</title>
      </Helmet>
      <div className='vh-100 d-flex flex-column justify-content-center align-items-center'><h1>Transaction Complete</h1>
        <button className='btn btn-success'>
          <Link to='/' className='nav-link'>Home</Link>
        </button>
        <Outlet></Outlet>
      </div>

    </>
  )
}
