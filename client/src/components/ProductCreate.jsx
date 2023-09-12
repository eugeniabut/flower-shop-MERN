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
      setMessage("Product is created. See Product List");
      setErrorMessage("");
    } catch (error) {
      console.log("Error creating product:", error);
      setMessage("");
      setErrorMessage(
        error.response?.data?.message || "Error creating product"
      );
    }
  };

  return (
    <div>
      <div className="header-admin-product-create">
        
        <div className="header-links">
          <div>
            <NavLink to="/products/all-products-list">ProductList</NavLink>
          </div>

          <div>
           <NavLink to="/">Home</NavLink>
          </div>
        </div>
      </div>
      <div className="main-container">
        <h1>Create Product</h1>
        <div className="internal-container">
          <div className="form-image">
            {postData.productImage && (
              <img src={postData.productImage} alt="Product" />
            )}
          </div>

          
          <div className="form-product-create">
            <form onSubmit={submitHandler}>
              <div className="form-input">
                <label htmlFor="productName">Product Name:</label>
                <input
                  type="text"
                  name="productName"
                  value={postData.productName}
                  onChange={(e) =>
                    setPostData({ ...postData, productName: e.target.value })
                  }
                />
              </div>
              <div className="form-input">
                <label htmlFor="productPrice">Product Price:</label>
                <input
                  name="productPrice"
                  type="number"
                  value={postData.productPrice}
                  onChange={(e) =>
                    setPostData({ ...postData, productPrice: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-input">
                <label htmlFor="productAmount">Product Amount:</label>
                <input
                  name="productAmount"
                  type="number"
                  value={postData.productAmount}
                  onChange={(e) =>
                    setPostData({ ...postData, productAmount: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-input">
                <label>Product Image:</label>
                <FileBase64
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPostData({ ...postData, productImage: base64 })
                  }
                />
              </div>

              <button type="submit" className="btn-create-product">Create Product</button>
            </form>
            {message && <div className="success-message">{message}</div>}
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
