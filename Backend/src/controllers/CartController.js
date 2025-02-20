import Cart from "../models/CartModel.js";

//  Add item to cart
export const addToCart = async (req, res) => {
  const { name, discountedPrice, quantity, image } = req.body;
  
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.name === name);

    if (existingItem) {   
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ name, discountedPrice, quantity, image });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.log("error in cart", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCart = async (req, res) => {

  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


// Update cart item quantity
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  const { id } = req.params;

  const userId = req.user._id;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find the item inside the cart
    const item = cart.items.find((item) => item._id.toString() === id);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};


//  Remove item from cart
export const removeFromCart = async (req, res) => {
  const { id } = req.params;

  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });
       
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item._id.toString() !== id);
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


