import Wishlist from "../models/WishlistModel.js";


export const addToWishlist = async (req, res) => {

  const { name, discountedPrice, quantity, image } = req.body; 
  
  const userId = req.user._id; 
 

  try {
   
    let userWishlist = await Wishlist.findOne({ userId });

    if (!userWishlist) {
      userWishlist = new Wishlist({ userId, items: [] });
    }

    const existingItem = userWishlist.items.find((item) => item.name === name);

    if (existingItem) {

      existingItem.quantity += quantity;
    } else {
      
      userWishlist.items.push({ name, discountedPrice, quantity, image });
    }

    await userWishlist.save();

    res.status(200).json({ message: "Item added to wishlist", wishlist: userWishlist });
  } catch (error) {
    console.error("Error in wishlist:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


//  Get user's wishlist
export const getWishlist = async (req, res) => {

    const userId = req.user._id;
    try {
      const wishlist = await Wishlist.findOne({ userId });
      if (!wishlist) return res.status(404).json({ message: "Wishlist is empty" });
  
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  };

  export const removeFromWishlist = async (req, res) => {
    const { id } = req.params;
  
    const userId = req.user._id;
  
    try {
      const removedwishlist = await Wishlist.findOne({ userId });
      
      if (!removedwishlist) return res.status(404).json({ message: "Wishlist not found" });
  
      removedwishlist.items = removedwishlist.items.filter((item) => item._id.toString() !== id);
      await removedwishlist.save();
  
      res.status(200).json({ message: "Item removed from wishlist", removedwishlist });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  };

