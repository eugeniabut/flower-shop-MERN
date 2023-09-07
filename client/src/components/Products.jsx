import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './Header';
import Basket from './Basket';
import '../css/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  

  useEffect(() => {
    axios.get('http://localhost:5000/products/all-products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const addToBasket = (product) => {
    const parsedProduct = { ...product, productPrice: parseFloat(product.productPrice) };
    setBasket([...basket, parsedProduct]);
  };


  const handleDeleteItem = (index) => {
    const updatedBasket = [...basket];
    updatedBasket.splice(index, 1);
    setBasket(updatedBasket);
  };


 return (
    <div>
   <Header/>

      <div>
        <div className="products">
          {products.map((product) => (
            <div key={product._id} className="card" style={{ width: '18rem' }}>
              {product.productImage && (
                <img src={product.productImage} alt={product.productName} className="card-img-top" />
              )}
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-text">${product.productPrice}</p>
              <div>
                <button className="card-btn btn-primary" onClick={() => addToBasket(product)}>
                  Add to Basket
                </button>
              </div>
            </div>
          ))}
        </div>
        <Basket
          basket={basket} onDeleteItem={handleDeleteItem} 
          productName={basket[basket.length - 1]?.productName} 
          productPrice={basket[basket.length - 1]?.productPrice}      />
       
      </div>
    </div>
  );
};

export default Products;