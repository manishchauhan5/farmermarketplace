import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    password: {
      type: String,
      required: true,
      // minlength: [8, "Password must be at least 8 characters long"], 
    }
  },
  { timestamps: true } 
);

export const User = mongoose.model('User', userSchema);

