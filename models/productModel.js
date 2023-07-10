import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({

  productImage:{
type:String
  },
  productName: { 
    type: String, 
    required: true },

  productPrice: {
    type: String,
    required: true,
  },

  available: {
    type: String,
    default: true,
  },
  
});
export default mongoose.model("Product", productSchema);
