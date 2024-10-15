import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { UserToken } from "../Context/UserToken";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading"

export default function Wishlist() {
// handling cart
let {addToCart ,setCartNumber} = useContext(CartContext)
let {isLogin} = useContext(UserToken)
let [loading,setLoading] = useState(false)
async function addToCartFunc(id){
  console.log("Running addToCartFunc");
  let res = await addToCart(id)

  if(!isLogin){
    toast.error(res.response.data.message);
    return
  }
  toast.success(res.data.message.split(" ").slice(0,3).join(" "),{duration:2000})
  setCartNumber(res?.data.numOfCartItems);
  delWishlistItemFunc(id)
}


  let {getWishlist,delWishlistItem,setWishlistNumber ,wishlistNumber} = useContext(WishlistContext);
  let [data, setData] = useState(null);
    // displays the list
    async function getWishlistFunc() {
      setLoading(true)
      let res = await getWishlist();
      if (res?.data?.status === "success"){
        setData(res?.data.data);
        console.log(res?.data.data);
        setWishlistNumber(res?.count);
        console.log(wishlistNumber);
        setLoading(false)
      }
      setLoading(false)
    }

    // delete item
    async function delWishlistItemFunc(id) {
      let res = await delWishlistItem(id);
      console.log(res);
      if (res.data.status === "success") {
        getWishlistFunc();
        toast.success("Item removed succesfully", { duration: 1500 , iconTheme:{primary:"#DC3545"}});
      }
    }

    useEffect(() => {
      if (isLogin == null) return;
      getWishlistFunc();
    }, [isLogin]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wishlist</title>
      </Helmet>
      <div className="container">
        {loading?<Loading></Loading>:
          <div className="cart-box p-3 bg-main-light">
            <h1 className="">My Wishlist</h1>
            {data? (
              <>
                {data?.map((ele) => (
                  <div key={ele._id} className="row align-items-center">
                    <div className="col-md-9">
                      <div className="row my-3 align-items-center">
                        <div className="col-md-2">
                          <img
                            src={ele.imageCover}
                            className="w-100"
                            alt=""
                          />
                        </div>
                        <div className="col-md-10">
                          <p>{ele.title}</p>
                          <p className="text-main">{ele.price} EGP</p>
                          <span
                            onClick={() => {
                              delWishlistItemFunc(ele._id);
                            }}
                            className="cursor-pointer"
                          >
                            Remove <i className="fa-solid fa-trash heartColor"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <button onClick={()=>{addToCartFunc(ele._id)}} className="btn text-main border border-1 border-success-subtle px-2 py-1">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
                {/* <Link to="/cart">
                  <button className="btn btn-success border-0 bg-main">Go to Cart</button>
                </Link> */}
              </>
            ) : 
              <p className="fw-bold p-3">Your Wishlist is Empty</p>
            }
          </div>
        }
      </div>
    </>
  );
}
