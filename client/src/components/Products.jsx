import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend endpoint
    axios.get("http://localhost:5000/products/all-products")
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
        <div key={product._id} className="card" style={{ width: '18rem' }}>
          {product.productImage && (
            <img src={product.productImage} alt={product.productName} className="card-img-top"/>
          )}
          <h5 className="card-title">{product.productName}</h5>
          <p className="card-text">${product.productPrice}</p>
          <div>
             <button className="btn btn-primary" onClick={() => addToBasket(product._id)}>
            Add to Basket
          </button>
          </div>
         </div>
      
      ))}
    </div>
  );
};

export default Products;