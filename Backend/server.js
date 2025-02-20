import express from 'express';
import { connectDB } from './src/config/db.js';
import router from './src/routes/AuthRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import productRouter from './src/routes/ProductRoutes.js';
import cartrouter from './src/routes/CartRoutes.js';
import { wishlistrouter } from './src/routes/WishlistRoutes.js';
import { orderRoutes } from './src/routes/orderRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB()

app.use('/v1/user', router)
app.use('/v1/product', productRouter)
app.use('/v1/cart', cartrouter)
app.use('/v1/wishlist', wishlistrouter)
app.use('/api/v1/order', orderRoutes)

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


