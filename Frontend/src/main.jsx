import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import {App} from './App.jsx'
import { UserProvider } from './useContext/UserContext.jsx';
import { CartProvider } from './useContext/CartContext.jsx';
import { WishlistProvider } from './useContext/WishlistContext.jsx';
import { SearchProvider } from './useContext/SearchContext.jsx';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <SearchProvider>
    <UserProvider>
    <CartProvider>
    <WishlistProvider>
    <App />
    </WishlistProvider>
    </CartProvider>
    </UserProvider> 
    </SearchProvider>  
  // </React.StrictMode>
);
