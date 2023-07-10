import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend endpoint
    axios.get("http://localhost:4000/products/all-products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const addToBasket = (productId) => {
    // Logic to add the product to the basket
    console.log(`Added product with ID ${productId} to the basket`);
  };

  return (
    
    <div className="products">

      <h1>Products</h1>
      {products.map((product) => (
        <div key={product._id} className="product-card">
          {product.productImage && (
            <img className="product-image" src={product.productImage} alt={product.productName} />
          )}
          <h3 className="product-name">{product.productName}</h3>
          <p className="product-price">${product.productPrice}</p>
          <button className="add-to-basket-btn" onClick={() => addToBasket(product._id)}>
            Add to Basket
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;