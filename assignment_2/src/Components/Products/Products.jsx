import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { QueryClient, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { UserToken } from "../Context/UserToken";
import { CartContext } from "../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { WishlistContext } from "../Context/WishlistContext";

export default function Products() {
    // adding to wishlist
    let {addToWishlist,setWishlistNumber} = useContext(WishlistContext)
    async function addToWishlistFunc(id){
      console.log("Running addToWishlistFunc");
      let res = await addToWishlist(id)
  
      if(!isLogin){
        toast.error(res?.response.data.message);
        return
      }
      toast.success("Added to Wishlist",{duration:2000, iconTheme:{primary:"#DC3545"}})
      setWishlistNumber(res?.data.count);
    }
  // handling cart
  let {addToCart ,setCartNumber} = useContext(CartContext)
  let {isLogin} = useContext(UserToken)
  async function addToCartFunc(id){
    console.log("Running addToCartFunc");
    let res = await addToCart(id)

    if(!isLogin){
      toast.error(res.response.data.message);
      return
    }
    toast.success(res.data.message.split(" ").slice(0,3).join(" "),{duration:2000})
    setCartNumber(res?.data.numOfCartItems);
  }
function getData(){
    return  axios.get(`${process.env.REACT_APP_BaseUrl}/api/product`,{
      "headers" : {
        "ngrok-skip-browser-warning": "69420"
      },
    });
}

const {data, isLoading, isFetching, isError} =  useQuery("products",getData)
console.log(data);


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <div className="container">
        <div className="row g-3">
          <h1 className="p-2 text-center my-3">ALL Products</h1>
          {isLoading ? (
            <h1 className="text-center text-main">
              Loading <i className="fa-solid fa-spinner fa-spin"></i>
            </h1>
          ) : (
              data?.data.map((ele) => 
            <div className="col-lg-3 col-md-6" key={ele._id}>
            <div className="product rounded-3 p-3">
                <Link to={`/productDetails/${ele._id}`}>
                  <img style={{objectFit:"cover"}} src={ele.imageCover} alt={ele.slug} className="img-fluid mb-2"/>
                  <p className="text-main fw-bold px-3">{ele.category.name}</p>
                  <p className="fw-bold px-3">{ele.title.split(" ").slice(0,2).join(" ")}</p>
                  <div className="product-box d-flex justify-content-between">
                      <span className="fw-bold px-3 fs-6">{ele.price} EGP</span>
                      <span className="fw-bold px-3"><i className="fa-solid fa-star rating-color"></i> {ele.ratingsAverage}</span>
                  </div>
                </Link>
                  <div className="card-btns">
                    <button onClick={()=>{addToCartFunc(ele._id)}} className="btn bg-main text-white my-2 mx-auto d-block">Add to Cart</button>
                    <button onClick={()=>{addToWishlistFunc(ele._id)}} className="my-2 ms-auto d-block border-0 bg-transparent"><i className="fa-solid fa-heart fs-3 text-danger"></i></button>
                  </div>
            </div>
            </div>)
          )}
        </div>
      </div>
    </>
  );
}
