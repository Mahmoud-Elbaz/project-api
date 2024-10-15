import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { UserToken } from './UserToken'


export let WishlistContext = createContext(0)

export default function WishlistContextProvider({children}) {
  let [wishlistNumber,setWishlistNumber] = useState(0)
  let [wishlistId,setWishlistId] = useState(0)
  let {isLogin} = useContext(UserToken)
  let headers = {token:isLogin}
  


  // add to wishlist
  function addToWishlist(productId){
    return axios.post(`${process.env.REACT_APP_BaseUrl}/api/v1/wishlist`,{productId},{headers}).then(res=>res).catch(err=>err)
  }
  // get wishlist
  function getWishlist(){
    return axios.get(`${process.env.REACT_APP_BaseUrl}/api/v1/wishlist`,{headers}).then(res=>res).catch(err=>err)
  }
  // delete item
  function delWishlistItem(id){
    return axios.delete(`${process.env.REACT_APP_BaseUrl}/api/v1/wishlist/${id}`,{headers}).then(res=>res).catch(err=>err)
  }

  return <WishlistContext.Provider value={{addToWishlist,getWishlist,delWishlistItem,setWishlistNumber,wishlistNumber}}>
      {children}
    </WishlistContext.Provider>
  
}
