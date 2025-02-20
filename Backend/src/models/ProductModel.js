import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  expiryDate: {
    type: Date,
    required: false, 
  },
  actualPrice: 
  { 
    type: Number, 
    required: true 
  },
  offerPrice: {
    type: Number,
    required: true,
  },
  image: 
    {
      url: { type: String, required: false },
      publicId: { type: String, default: "Product Image" },
    },
    
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  }
},{timestamps : true});

export default mongoose.model("Product", productSchema);
