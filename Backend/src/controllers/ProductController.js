import cloudinary from "../config/cloudinaryConfig.js";
import ProductModel from "../models/ProductModel.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, category, expiryDate, actualPrice, offerPrice } = req.body;

    if (!name || !description || !category || !actualPrice || !offerPrice || !req.file ) {
      return res.status(400).json({ message: "All fields are required except expiry date" });
    }
   

    const image = {
        url: req.file.path,
        publicId : req.file.originalname
    }

    const product = new ProductModel({
      name,
      description,
      category,
      expiryDate,
      actualPrice,
      offerPrice,
      image,
      seller: req.user._id,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.log("error in selling product", error);
    
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const getAllProducts = async (req, res) => {
    
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllUserProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({ seller: req.user._id });
    res.status(200).json(products);
  } catch (error) {
    console.log("error in getting user products", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}


export const getProductById = async (req, res) => {
  
  try {

    const user = req.user._id;
    const product = await ProductModel.findById(req.params.pid);

    if(user !== product.seller.toString()) return res.status(401).json({ message: "Unauthorized" });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.log("error in getting product by id", error);
    
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const updateProduct = async (req, res) => {
  
  try {
    const { name, description, category, expiryDate, actualPrice, offerPrice, image } = req.body;
    const user = req.user._id;    
    
    const product = await ProductModel.findById(req.params.pid);
    
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (user !== product.seller.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (category !== undefined) updateFields.category = category;
    if (expiryDate !== undefined) updateFields.expiryDate = expiryDate;
    if (actualPrice !== undefined) updateFields.actualPrice = actualPrice;
    if (offerPrice !== undefined) updateFields.offerPrice = offerPrice;
    if (image !== undefined) updateFields.image = image;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      updateFields,
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.log("error in updating product", error);
    
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const user = req.user._id;

    const product = await ProductModel.findById(req.params.pid);

    await cloudinary.uploader.destroy(product.image.publicId);
    
    if(user !== product.seller.toString()) return res.status(401).json({ message: "Unauthorized" });

    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.pid);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
