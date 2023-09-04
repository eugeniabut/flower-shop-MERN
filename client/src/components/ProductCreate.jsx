import React, { useState } from "react";
import axios from "axios";
import "../css/ProductCreate.css";
import { NavLink } from "react-router-dom";

import FileBase64 from "react-file-base64";

const ProductCreate = () => {
  const [postData, setPostData] = useState({
    productName: "",
    productPrice: "",
    productAmount: "",
    productImage: "",
  });

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (e) => {
       e.preventDefault();
    try {
   
     
      await axios.post(
        `${process.env.REACT_APP_BE_URL}/products/create-product`,
        postData
      );
      
      setPostData({
        productName: "",
        productPrice: "",
        productAmount: "",
        productImage: "",
      });
      setMessage("Product created and added to Product List")
      setErrorMessage(""); 
    } catch (error) {
      console.log("Error creating product:", error);
      setMessage("");
      setErrorMessage("Error creating product");
      
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
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={postData.productName}
              onChange={(e) =>
                setPostData({ ...postData, productName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="productPrice">Product Price:</label>
            <input
              name="productPrice"
              type="number"
              id="productPrice"
              value={postData.productPrice}
              onChange={(e) =>
                setPostData({ ...postData, productPrice: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="productAmount">Product Amount:</label>
            <input
              name="productAmount"
              type="number"
              id="productAmount"
              value={postData.productAmount}
              onChange={(e) =>
                setPostData({ ...postData, productAmount: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Product Image:</label>
            <FileBase64
              //name="productImage" I do not need it, will not work!
              type="file"
              multiple={false}
             
              onDone={({ base64 }) =>
                setPostData({ ...postData, productImage: base64 })
              }
            />
            {postData.productImage && (
              <img src={postData.productImage} alt="Product" />
            )}
          </div>

          <button type="submit">Create Product</button>
        </form>
        
        {message && <div className="success-message">{message}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

      </div>
    </div>
  );
};

export default ProductCreate;
