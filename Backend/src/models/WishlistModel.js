import mongoose from "mongoose";

const WishlistItemSchema = new mongoose.Schema({
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

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [WishlistItemSchema], 
}, { timestamps: true });

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

export default Wishlist;
