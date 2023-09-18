import express from "express";

import {
  createProduct,
  getSingleProduct,
  getAllProducts,
  editProduct,
  deleteSingleProduct,
} from "../controllers/productController.js";

const router = express.Router();


// http://localhost:5000/products/all-products   (GET)
//router.get("/all-products", getAllProducts)
router.get("/single-product", getSingleProduct);
router.get("/all-products", getAllProducts);
router.put("/all-products/:id", editProduct);
router.post("/create-product", createProduct); // Use Multer to handle file upload
router.delete("/all-products/:id", deleteSingleProduct);

export default router;
