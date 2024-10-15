import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';
import { CartContext } from '../Context/CartContext';
import { UserToken } from '../Context/UserToken';
import toast from 'react-hot-toast';

export default function ProductDetails() {
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

    let {id}= useParams()
    ;
    function getData(){
        return  axios.get(`${process.env.REACT_APP_BaseUrl}/api/product/${id}`);
    }

    const {data, isLoading, isError} =  useQuery("productDetails",getData)
    console.log(data?.data);

    if(isLoading){
        return <Loading></Loading>
    }

  return (
    <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{data?.data.title}</title>
        </Helmet>
        <div className='container my-5'>
            <div className="row align-items-center">
                <div className="col-lg-3">
                    <img src={data?.data.imageCover} alt={data?.data.title} className='w-100' />
                </div>
                <div className="col-lg-9">
                    <p>{data?.data.title}</p>
                    <p>{data?.data.description}</p>
                    <p>{data?.data.category.name}</p>
                    <div className="box d-flex justify-content-between">
                        <span className='fw-bolder'>{data?.data.price} EGP</span>
                        <span className='fw-bolder'>{data?.data.ratingsAverage} <i className='fa-solid fa-star rating-color'></i></span>
                    </div>
                    <button onClick={()=>{addToCartFunc(data?.data._id)}} className='btn w-100 bg-main text-white my-3'>Add to Cart</button>
                </div>
            </div>
        </div>
    </>
  )
}
