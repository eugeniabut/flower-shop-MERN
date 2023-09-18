import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({

  productImage: String,
  
  productName: { 
    type: String, 
    required: true },

  productPrice: {
    type: String,
    required: true,
  },

  productAmount:{
    type: Number,
    required:true,
  },

  available: {
    type:String,
  }
  
});

export default mongoose.model("Product", productSchema);
