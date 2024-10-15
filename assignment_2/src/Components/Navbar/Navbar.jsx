import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { UserToken } from "../Context/UserToken";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  let { isLogin, setIsLogin } = useContext(UserToken);
  let {cartNumber} = useContext(CartContext)
  let navigate = useNavigate()


  function logOut(){
    localStorage.removeItem('userToken')
    setIsLogin(null)
    navigate('/')
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand txt-color text-capitalize fs-2 fw-bolder"
          >
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-capitalize">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  home
                </NavLink>
              </li>
              {isLogin ? (
                <li className="nav-item">
                  <NavLink to="cart" className="nav-link">
                    cart
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              <li className="nav-item">
                <NavLink to="wishlist" className="nav-link">
                  wishlist
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="products" className="nav-link">
                  products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="categories" className="nav-link">
                  categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="brands" className="nav-link">
                  brands
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-capitalize">
              {isLogin ? (
                <>
                  <li className="nav-item">
                    <NavLink to="cart" className="nav-link" aria-current="page">
                      <i className="position-relative fa-solid fa-shopping-cart fs-4 text-main"><span className="cart-num text-dark">{cartNumber}</span></i>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button className="cursor-pointer btn btn-danger ms-lg-3 rounded-4" onClick={logOut}>logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="register" className="nav-link text-main">
                      register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="login" className="btn btn-success rounded-4 ms-lg-3">
                      log in
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
