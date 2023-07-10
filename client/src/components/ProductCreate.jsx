import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ProductCreate.css"

const ProductCreate = () => {
  const [productImage, setProductImage] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [available, setAvailable] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/products/create-product', {
        productImage,
        productName,
        productPrice,
        available
      });

      console.log('Product created:', response.data);
      // Reset the form
      setProductImage('');
      setProductName('');
      setProductPrice('');
      setAvailable('');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Product Image:</label>
          <input
            type="text"
            value={productImage}
            onChange={(event) => setProductImage(event.target.value)}
          />
        </div>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
        </div>
        <div>
          <label>Product Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(event) => setProductPrice(event.target.value)}
          />
        </div>
        <div>
          <label>Available:</label>
          <input
            type="checkbox"
            checked={available}
            onChange={(event) => setAvailable(event.target.checked)}
          />
        </div>
        <button type="submit">Create Product</button>
      </form>

      
    </div>
  );
};

export default ProductCreate;
