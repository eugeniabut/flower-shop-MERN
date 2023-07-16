import express from "express"
import {createProduct, getSingleProduct,getAllProducts, editProduct,deleteSingleProduct} from "../controllers/productController.js"

const router = express.Router()


// http://localhost:5000/products/all-products   (GET)
router.get("/all-products", getAllProducts)
router.get("/all-product",getSingleProduct)
router.put("/all-products/:id", editProduct)
router.post("/create-product", createProduct)
router.delete("/all-products/:id",deleteSingleProduct)


export default router

