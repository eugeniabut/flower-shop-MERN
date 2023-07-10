import Product from "../models/productModel.js";

export const createProduct = async (req, res, next) => {
  try {
    const { productImage, productName, productPrice, available } = req.body;

    const newProduct = new Product({
      productImage,
      productName,
      productPrice,
      available,
    });

    const createdProduct = await newProduct.save();
    
    if (!createdProduct) {
      throw new Error('Failed to create product');
    }

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res,next) => {
  try {
   const allProducts = await Product.find()
   res.status(201).json(allProducts)
   
  } catch (err) {
    console.error('Error fetching products:', err);
   next(err)
  }
};

