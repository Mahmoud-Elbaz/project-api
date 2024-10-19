import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { UserToken } from './UserToken'


export let CartContext = createContext(0)

export default function CartContextProvider({children}) {
  let [cartNumber,setCartNumber] = useState(0)
  let [cartId,setCartId] = useState(0)
  let {isLogin} = useContext(UserToken)
  let headers = {'Authorization': `Bearer ${isLogin}`}


  // add to cart
  function addToCart(productId){
    return axios.post(`${process.env.REACT_APP_BaseUrl}/api/cart`,{productId,quantity:1},{headers}).then(res=>res).catch(err=>err)
  }
  // get cart
  function getCart(){
    return axios.get(`${process.env.REACT_APP_BaseUrl}/api/cart`,{headers}).then(res=>res).catch(err=>err)
  }
  // delete item
  function delCartItem(id){
    return axios.delete(`${process.env.REACT_APP_BaseUrl}/api/cart/${id}`,{headers}).then(res=>res).catch(err=>err)
  }
  // update item count
  function updateCartItem(id,count){
    return axios.post(`${process.env.REACT_APP_BaseUrl}/api/cart`,{productId:id,quantity:count},{headers}).then(res=>res).catch(err=>err)
  }
  // check out
  function checkOut(id,shippingAddress){
    return axios.post(`${process.env.REACT_APP_BaseUrl}/api/v1/orders/checkout-session/${id}`,{shippingAddress},{headers}).then(res=>res).catch(err=>err)
  }

  return <CartContext.Provider value={{addToCart,getCart,delCartItem ,updateCartItem,checkOut,cartNumber,setCartNumber,cartId,setCartId}}>
      {children}
    </CartContext.Provider>
  
}