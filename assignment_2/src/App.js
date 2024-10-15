import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Layout from './Components/Layout';
import Notfound from './Components/Notfound/Notfound';
import Cart from './Components/Cart/Cart';
import Category from './Components/Category/Category';
import Wishlist from './Components/Wishlist/Wishlist';
import Products from './Components/Products/Products';
import Brand from './Components/Brand/Brand';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { useContext, useEffect } from 'react';
import { UserToken } from './Components/Context/UserToken';
import ProtectedRoute from './Components/ProtectedRoute';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetCode from './Components/ResetCode';
import ResetPass from './Components/ResetPass';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { Toaster } from 'react-hot-toast';
import Orders from './Components/Orders/Orders';
function App() {
  let {setIsLogin} = useContext(UserToken)
  
  useEffect(()=>{
    if(localStorage.getItem('userToken'))
    setIsLogin(localStorage.getItem('userToken'))
  },[])

  const routes = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '/', element: <Home></Home> },
        { path: 'cart', element:<ProtectedRoute><Cart></Cart></ProtectedRoute> },
        { path: 'wishlist', element: <Wishlist></Wishlist> },
        { path: 'allorders', element: <Orders></Orders> },
        { path: 'products', element: <Products></Products> },
        { path: 'productDetails/:id', element: <ProductDetails></ProductDetails> },
        { path: 'categories', element: <Category></Category> },
        { path: 'brands', element: <Brand></Brand> },
        { path: 'register', element: <Register></Register> },
        { path: 'login', element: <Login></Login> },
        { path: 'forgetPass', element: <ForgetPassword></ForgetPassword> },
        { path: 'resetCode', element: <ResetCode></ResetCode> },
        { path: 'resetPass', element: <ResetPass></ResetPass> },
        {path: '*' , element: <Notfound></Notfound>}
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster></Toaster>
    </>
  );
}

export default App;
