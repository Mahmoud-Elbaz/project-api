import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';
export default function Category() {

  function getData() {
    return axios.get(`${process.env.REACT_APP_BaseUrl}/api/category`);
  }

  const { data, isLoading, isError } = useQuery("categoryDetails", getData)
  console.log(data?.data);

  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
      <div className="container">
        <div className="row g-3">
          <h1 className="p-2 text-center my-3">ALL Categories</h1>
          {isLoading ? (
            <h1 className="text-center text-main">
              Loading <i className="fa-solid fa-spinner fa-spin"></i>
            </h1>
          ) : (
            data?.data.map((ele) =>
              <div className="col-lg-3 col-md-6" key={ele._id}>
                <div className="product rounded-3 p-3">
                  <div>
                    <img style={{ objectFit: "cover" }} src={ele.image} alt={ele.slug} className="img-fluid mb-2" />
                    <p className="text-main fw-bold px-3">{ele.name}</p>

                  </div>
                </div>
              </div>)
          )}
        </div>
      </div>
    </>
  )
}
