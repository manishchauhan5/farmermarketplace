import { razorpayInstance } from "../config/razorpay.js";
import { Order } from "../models/orderSchema.Model.js";
import  crypto  from 'crypto';

export const createOrderController = async (req, res) => {
  const { total } = req.body;

  try {
    const options = {
      amount: Number(total * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("error in creating order", error);

    res.status(501).json({
      success: false,
      error: "Internal Server Error!",
    });
  }
};

export const verifyPaymentController = async (req, res) => {

  
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    items,
    amount,
  } = req.body;
  
  const userId = req.user._id;
  
  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Payment Signature!",
      });
    }

    const newOrder = new Order({
      items,
      total: amount,
      user: userId,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "Order Placed",
    });

    await newOrder.save();
    res.json({
      success: true,
      message: "Payment Successfully & Order Placed Successfully!",
    });
  } catch (error) {
    console.log("error in place order", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getOrderController = async (req, res) => {
  const userId = req.user._id;

  try {
    
    const orders = await Order.find({ user: userId })
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No orders found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};