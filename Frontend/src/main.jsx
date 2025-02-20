import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import {App} from './App.jsx'
import { UserProvider } from './useContext/UserContext.jsx';
import { CartProvider } from './useContext/CartContext.jsx';
import { WishlistProvider } from './useContext/WishlistContext.jsx';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <CartProvider>
    <WishlistProvider>
    <App />
    </WishlistProvider>
    </CartProvider>
    </UserProvider>   
  </React.StrictMode>
);
