import React from 'react'

export default function () {
  return (
    <footer className='py-5 bg-main-light'>
        <div className="container p-2">
            <h3 className='fw-bold'>Get the FreshCart app</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor.</p>
            <div className="row">
                <div className="col-md-9">
                    <input type="email" placeholder='Email' className='form-control mb-3' />
                </div>
                <div className="col-md-3">
                    <button className='btn bg-main text-white form-control'>Share App Link</button>
                </div>
            </div>
                <hr/>
        </div>
    </footer>
  )
}
