import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { UserToken } from './UserToken';

export const CartContext = createContext(0);

export default function CartContextProvider({ children }) {
    const [cartNumber, setCartNumber] = useState(0);
    const [cartId, setCartId] = useState(0);
    const { isLogin } = useContext(UserToken);
    const headers = { Authorization: `Bearer ${isLogin}` }; 
    const API_BASE_URL = process.env.REACT_APP_BaseUrl;

    const addToCart = async (productId) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/Cart/AddToCart`,
                { userId: isLogin, productId, quantity: 1 }, 
                { headers }
            );
            return response;
        } catch (error) {
            console.error('Error adding to cart:', error);
            return error.response || { data: {} };
        }
    };

    const getCart = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/Cart`,
                { headers }
            );
            return response;
        } catch (error) {
            console.error('Error fetching cart:', error);
            return error.response || { data: {} };  
        }
    };

    const delCartItem = async (id) => {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/api/Cart/${id}`,
                { headers }
            );
            return response;
        } catch (error) {
            console.error('Error deleting cart item:', error);
            return error.response || { data: {} };  
        }
    };

    const updateCartItem = async (id, count) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/Cart/${id}`,
                { count },
                { headers }
            );
            return response;
        } catch (error) {
            console.error('Error updating cart item:', error);
            return error.response || { data: {} };  
        }
    };

    const checkOut = async (id, shippingAddress) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/v1/orders/checkout-session/${id}`,
                { shippingAddress },
                { headers }
            );
            return response;
        } catch (error) {
            console.error('Error during checkout:', error);
            return error.response || { data: {} };  
        }
    };

    return (
        <CartContext.Provider value={{ addToCart, cartNumber, setCartNumber, cartId, setCartId }}>
            {children}
        </CartContext.Provider>
    );
}
