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
    type: Boolean,
    default: true,
  },
  boughtdBy: {
    type: String,
    default: "non",
  },
});
export default mongoose.model("Product", productSchema);
