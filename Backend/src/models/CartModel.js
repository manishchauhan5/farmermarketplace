import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [CartItemSchema], 
}, { timestamps: true });

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
