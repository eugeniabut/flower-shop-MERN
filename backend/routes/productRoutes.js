import express from 'express';
import multer from 'multer'; // Import multer
import {
  createProduct,
  getSingleProduct,
  editProduct,
  deleteSingleProduct,
} from '../controllers/productController.js';

const router = express.Router();
const storage = multer.memoryStorage(); // In-memory storage
const upload = multer({ storage }); // Define multer middleware


// http://localhost:5000/products/all-products   (GET)
//router.get("/all-products", getAllProducts)
router.get("/all-product",getSingleProduct)
router.put("/all-products/:id", editProduct)
router.post('/create-product', upload.single('productImage'), createProduct); // Use Multer to handle file upload
router.delete("/all-products/:id",deleteSingleProduct)



export default router

