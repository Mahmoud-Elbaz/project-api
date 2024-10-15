import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../Context/CartContext";
import { UserToken } from "../Context/UserToken";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import Loading from "../Loading/Loading"

export default function Cart() {
  let { getCart, delCartItem, updateCartItem, setCartNumber, cartId,setCartId,checkOut } = useContext(CartContext);
  let { isLogin } = useContext(UserToken);
  let [data, setData] = useState(null);
  let [formFlag,setFormFlag] =useState(false)
  let [loading,setLoading] = useState(false)

  // displays the cart
  async function getCartFunc() {
    setLoading(true)
    let res = await getCart();
    if (res?.data?.status === "success"){
      setData(res?.data);
      setCartNumber(res?.data.numOfCartItems);
      setCartId(res?.data.data._id)
      setLoading(false)
    }
    setLoading(false)
  }
  // delete item
  async function delCartItemFunc(id) {
    let res = await delCartItem(id);
    console.log(res);
    if (res.data.status === "success") {
      getCartFunc();
      toast.success("Item removed succesfully", { duration: 1500 });
    }
  }
  // update count
  async function updateCartItemFunc(id,count) {
    let res = await updateCartItem(id,count);
    console.log(res);
    if (res.data.status === "success") {
      getCartFunc();
      console.log(res.data.data.products);
      // if(res.data.data.products.count<=0){
      //   delCartItemFunc(id)
      // }
    }
  }

  // form
  function getForm(){
    setFormFlag(true)
    toast.success("Scroll down and Complete shipping info",{duration:3000});
  }
  
  async function submitForm(values) {
    let res = await checkOut(cartId,values)
    console.log(res);
    if(res?.data?.status === "success"){
      window.location.href = res?.data?.session.url
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city:""
    },
    onSubmit: submitForm,
  });

  useEffect(() => {
    if (isLogin == null) return;
    getCartFunc();
  }, [isLogin]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      <div className="container">
        {loading?<Loading></Loading>:
          <div className="cart-box p-3 bg-main-light">
            <h1 className="">Shop Cart</h1>
            {data && data?.data.totalCartPrice  ? (
              <>
                <h2 className="h3 text-main">
                  Total Price: {data?.data.totalCartPrice}
                </h2>
                {data?.data.products.map((ele) => (
                  <div key={ele.product._id} className="row align-items-center">
                    <div className="col-md-9">
                      <div className="row my-3 align-items-center">
                        <div className="col-md-2">
                          <img
                            src={ele.product.imageCover}
                            className="w-100"
                            alt=""
                          />
                        </div>
                        <div className="col-md-10">
                          <p>{ele.product.title}</p>
                          <p className="text-main">{ele.price}</p>
                          <span
                            onClick={() => {
                              delCartItemFunc(ele.product._id);
                            }}
                            className="cursor-pointer"
                          >
                            Remove <i className="fa-solid fa-trash text-main"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <button onClick={()=>{updateCartItemFunc(ele.product._id,ele.count-1)}} className="btn text-main border border-1 border-success-subtle px-2 py-1">
                        -
                      </button>
                      <span className="mx-2">{ele.count}</span>
                      <button onClick={()=>{updateCartItemFunc(ele.product._id,ele.count+1)}} className="btn text-main border border-1 border-success-subtle px-2 py-1">
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <button className="btn btn-success border-0 bg-main" onClick={getForm}>Check out</button>
              </>
            ) : (
              <p className="fw-bold p-3">Your Cart is Empty</p>
            )}
          </div>
        }
      </div>
      {/* form */}
      {formFlag? 
      <div className='container mb-5'>
        <form onSubmit={formik.handleSubmit}>
            <input type="text" className="form-control my-2" placeholder="Address" onChange={formik.handleChange} name="details" value={formik.values.details} />
            <input type="tel" className="form-control my-2" placeholder="Phone" onChange={formik.handleChange} name="phone" value={formik.values.phone} />
            <input type="text" className="form-control my-2" placeholder="City" onChange={formik.handleChange} name="city" value={formik.values.city} />
            <button className="btn bg-main text-white" type="submit">Send</button>
        </form>
      </div>
      :""}
    </>
  );
}
