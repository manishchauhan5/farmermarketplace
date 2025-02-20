import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: { type: String,  required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  total: { type: Number, required: true },
  paymentId: { type: String, required: true },
  status: {
    type: String,
    default: "Order Placed",
    enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
  },
}, { timestamps: true });

export const Order = mongoose.model('Order', OrderSchema);
