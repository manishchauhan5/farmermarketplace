import express from 'express';
import { addToCart, getCart, removeFromCart, updateCartItem } from '../controllers/CartController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const cartrouter = express.Router();

cartrouter.post('/addcart',requireSignIn, addToCart);
cartrouter.get('/getcart',requireSignIn, getCart);
cartrouter.delete('/deletecart/:id',requireSignIn, removeFromCart);
cartrouter.put('/updatecart/:id',requireSignIn, updateCartItem);




export default cartrouter;