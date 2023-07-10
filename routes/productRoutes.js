import express from "express"
import {createProduct, getProducts} from "../controllers/productController.js"

const router = express.Router()


// http://localhost:5000/products/all-products   (GET)
router.get("/all-products", getProducts)

router.post("/create-product", createProduct)


export default router

