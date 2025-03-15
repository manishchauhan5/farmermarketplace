const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseUrlAuth = `${API_BASE_URL}/v1/user/`;
const baseUrlPruduct = `${API_BASE_URL}/v1/product/`;
const baseUrlCart = `${API_BASE_URL}/v1/cart/`;
const baseUrlWishlist = `${API_BASE_URL}/v1/wishlist/`;


//Auth 
export const signUpApi =`${baseUrlAuth}register`;
export const loginApi = `${baseUrlAuth}login`;

// Product
export const addProductApi =`${baseUrlPruduct }addProduct`;
export const getAllProduct =`${baseUrlPruduct }allProduct`;
export const allUserProduct =`${baseUrlPruduct}allUserProducts`;
export const ProductById =`${baseUrlPruduct}getProduct`;
export const ProductByCategory = `${baseUrlPruduct}getProductByCategory`;

// Cart
export const addToCartApi =`${baseUrlCart }addcart`;
export const getCartApi =`${baseUrlCart }getcart`;
export const removeCartApi = `${baseUrlCart}deletecart`;

// Wishlist
export const addToWishlistApi =`${baseUrlWishlist }addwishlist`;
export const getWishlistApi =`${baseUrlWishlist }getwishlist`;
export const removeWishlistApi = `${baseUrlWishlist}deletewishlist`;



