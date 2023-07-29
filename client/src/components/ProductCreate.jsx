import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/ProductCreate.css";
import { NavLink } from "react-router-dom";

const ProductCreate = () => {
  const [productImage, setProductImage] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productAmount, setProductAmount] = useState('');
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {

  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/products/create-product', {
        productImage,
        productName,
        productPrice,
        productAmount
      });

      console.log('Product created:', response.data);
      // Reset the form
      setProductImage('');
      setProductName('');
      setProductPrice('');
      setProductAmount('');
      setMessage('Product added to Database. See Product List');

    } catch (error) {
      console.error('Error creating product:', error);
      setErrorMessage("Nothing was added");
    }
  };

  return (
    <div>

<header> 
<h2>Administrator</h2>
<div className='links'>
   
   
   <NavLink to="/products/all-products-list">
            Product List
          </NavLink>
         

         

          <NavLink to="/products/all-products">
            Shop
          </NavLink> 
          
          <NavLink to="/">
            Logout
          </NavLink>
        </div>
</header>
<body>
  
</body>

    <div className='container'>
      <h1>Create Product</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Product Image:</label>
          <input className='input'
            type="text"
            value={productImage}
            onChange={(event) => setProductImage(event.target.value)}
          />
        </div>
        <div>
          <label>Product Name:</label>
          <input className='input'
            type="text"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
        </div>

        <div>
          <label>Product Price:</label>
          <input className='input'
            type="number"
            value={productPrice}
            onChange={(event) => setProductPrice(event.target.value)}
          />
        </div>

        <div>
          <label>Product Amount:</label>
          <input className='input'
            type="number"
            value={productAmount}
            onChange={(event) => setProductAmount(event.target.value)}
          />
        </div>

        <div>
          <button type="submit">Add Product to Database</button>
          {message && <p className="success-message">{message}</p>}
          {errorMessage && <p className="failed-message">{errorMessage}</p>}
        </div>

        
      </form>
    </div>
    </div>
  );
};

export default ProductCreate;
