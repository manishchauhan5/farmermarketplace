import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/WishlistController.js';
import { uploadImage } from '../middlewares/imageUpload.js';

export const wishlistrouter = express.Router();

wishlistrouter.post('/addwishlist',requireSignIn, uploadImage.single("image"), addToWishlist);
wishlistrouter.get('/getwishlist', requireSignIn, getWishlist);
wishlistrouter.delete('/deletewishlist/:id', requireSignIn, removeFromWishlist);
