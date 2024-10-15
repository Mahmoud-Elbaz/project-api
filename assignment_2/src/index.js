import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserTokenProvider } from './Components/Context/UserToken';
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Components/Context/CartContext';
import WishlistContextProvider from './Components/Context/WishlistContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient()

root.render(
<UserTokenProvider>
<WishlistContextProvider>
<CartContextProvider>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
</CartContextProvider>
</WishlistContextProvider>
</UserTokenProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
