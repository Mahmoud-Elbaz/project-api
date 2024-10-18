import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "./Context/CartContext";
import { UserToken } from "./Context/UserToken";
import { WishlistContext } from "./Context/WishlistContext";

export default function FeaturedProducts() {
    const { addToWishlist } = useContext(WishlistContext);
    const { isLogin } = useContext(UserToken);
    const { addToCart, setCartNumber } = useContext(CartContext);

    const addToCartFunc = async (productId) => {
        if (!isLogin) {
            toast.error("You need to be logged in to add items to the cart.");
            return;
        }
        try {
            const res = await addToCart(productId); 
            if (res?.data) {
                toast.success("Item added to cart successfully", { duration: 2000 });
                setCartNumber(res?.data.numOfCartItems);
            } else {
                toast.error("Failed to add item to cart.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("An error occurred while adding the item to the cart.");
        }
    };

    const getData = () => {
        return axios.get(`${process.env.REACT_APP_BaseUrl}/api/product`);
    };

    const { data, isLoading } = useQuery("Fproducts", getData);
    console.log(data?.data);

    return (
        <div className="container">
            <div className="row g-3">
                {isLoading ? (
                    <h1 className="text-center text-main">
                        Loading <i className="fa-solid fa-spinner fa-spin"></i>
                    </h1>
                ) : (
                    data?.data.map((ele) => (
                        <div className="col-lg-3 col-md-6" key={ele._id}>
                            <div className="product rounded-3 p-3">
                                <Link to={`productDetails/${ele._id}`}>
                                    <img
                                        style={{ objectFit: "cover" }}
                                        src={ele.imageCover}
                                        alt={ele.slug}
                                        className="img-fluid mb-2"
                                    />
                                    <p className="text-main fw-bold px-3">{ele.category.name}</p>
                                    <p className="fw-bold px-3">{ele.title.split(" ").slice(0, 2).join(" ")}</p>
                                    <div className="product-box d-flex justify-content-between">
                                        <span className="fw-bold px-3 fs-6">{ele.price} EGP</span>
                                        <span className="fw-bold px-3">
                                            <i className="fa-solid fa-star rating-color"></i> {ele.ratingsAverage}
                                        </span>
                                    </div>
                                </Link>
                                <div className="card-btns">
                                    <button
                                        onClick={() => { addToCartFunc(ele._id); }}
                                        className="btn bg-main text-white my-2 mx-auto d-block"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
