import React, { useState } from "react";
import axios from "axios";
import "../css/ProductCreate.css";
import { NavLink } from "react-router-dom";

import FileBase64 from "react-file-base64";

const ProductCreate = () => {
  const [productImage, setProductImage] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productAmount, setProductAmount] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageUpload = (file) => {
    setProductImage(file.base64);
  };
  const formData = new FormData();

  const submitHandler = async () => {
    formData.append("productImage", productImage);
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productAmount", productAmount);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}/products/create-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Clear form fields and state
      setProductImage("");
      setProductName("");
      setProductPrice("");
      setProductAmount("");
    } catch (error) {
      console.log("Error creating product:", error);
      setErrorMessage("Error creating product");
      setMessage("");
    }
  };

  return (
    <div>
      <header>
        <h2>Administrator</h2>
        <div className="links">
          <NavLink to="/products/all-products-list">Product List</NavLink>
          <NavLink to="/products/all-products">Shop</NavLink>
          <NavLink to="/">Logout</NavLink>
        </div>
      </header>
      <div className="container">
        <h1>Create Product</h1>
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="productPrice">Product Price:</label>
            <input
              type="number"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="productAmount">Product Amount:</label>
            <input
              type="number"
              id="productAmount"
              value={productAmount}
              onChange={(e) => setProductAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Product Image:</label>
            <FileBase64
              name="productImage"
              type="file"
              multiple={false}
              onDone={handleImageUpload}
            />
            {productImage && <img src={productImage} alt="Product" />}
          </div>

          <button type="submit">Create Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductCreate;
