import Product from "../models/productModel.js";

export const createProduct = async (req, res, next) => {
  try {
    console.log("request body:", req.body);
    const { productName, productPrice, productAmount, productImage } = req.body;

    // Check if the product name already exists in the database
    const alreadyExist = await Product.findOne({ productName });
    if (alreadyExist !== null) {
      return res
        .status(400)
        .json({ message: "Product is already in the database" });
    }

    //Create a new product 
    const newProduct = new Product({
      productImage,
      productName,
      productPrice,
      productAmount,
    });

    // Save the new product to the database
    const createdProduct = await newProduct.save();

    if (!createdProduct) {
      throw new Error("Failed to create product");
    }

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const allProducts = await Product.findOne({ productName });
    res.status(201).json(allProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
    next(err);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    res.status(201).json(allProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
    next(err);
  }
};

export const deleteSingleProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    next(err);
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productImage, productName, productPrice, productAmount } = req.body;

    // Find the product by ID
    const product = await Product.findByIdAndUpdate(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product fields
    product.productImage = productImage;
    product.productName = productName;
    product.productPrice = productPrice;
    product.productAmount = productAmount;

    // Save the updated product
    await product.save();

    res.json(product); // Return the updated product as the response
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
