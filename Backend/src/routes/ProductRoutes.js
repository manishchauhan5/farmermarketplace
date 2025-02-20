import express from 'express';
import { addProduct, deleteProduct, getAllProducts, getAllUserProduct, getProductById, updateProduct } from '../controllers/ProductController.js';
import { uploadImage } from '../middlewares/imageUpload.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const productRouter = express.Router();

productRouter.get('/allProduct', getAllProducts); 
productRouter.get('/getProduct/:pid', requireSignIn, getProductById); 
productRouter.get('/allUserProducts', requireSignIn, getAllUserProduct); 
productRouter.delete('/deleteProduct/:pid',requireSignIn, deleteProduct);
productRouter.post('/addProduct',requireSignIn, uploadImage.single('image'), addProduct); 
productRouter.put('/updateProduct/:pid',requireSignIn, uploadImage.single('image'), updateProduct); 
export default productRouter;

