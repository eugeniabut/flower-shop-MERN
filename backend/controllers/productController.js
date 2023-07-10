import Product from "../models/productModel.js"


// http:/
export const createProduct = async (req, res, next) => {
  res.send("Welcome Product!!! ")
  try {
    const {productName, productPrice, available, boughtdBy} = req.body;

    const newProduct = new Product({
      productImage,
      productName,
      productPrice,
      available,
      boughtdBy,
    });

    const createdProduct = await newProduct.save();
    console.log(createdProduct)

    res.status(201).json(createdProduct);
    next();
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product' });
  }
};

export const getProducts = async (req, res,next) => {
  try {
   const allProducts = await Product.find({productName})
   res.status(201).json(allProducts)
   
  } catch (err) {
    
   next(err)
  }
};

