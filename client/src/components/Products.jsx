import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

import Basket from './Basket';
import '../css/Products.css';

const Products = ({ userName }) => {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/products/all-products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const addToBasket = (product) => {
    const parsedProduct = { ...product, productPrice: parseFloat(product.productPrice) };
    setBasket([...basket, parsedProduct]);
  };

  const navigate = useNavigate();
  const handleSignOut = () => {
    setIsSignedIn(false); 
    navigate('/');
  };

  const handleDeleteItem = (index) => {
    const updatedBasket = [...basket];
    updatedBasket.splice(index, 1);
    setBasket(updatedBasket);
  };


 return (
    <div>
      <header>
        {userName ? <div className="username">Hello {userName}!</div> : <div>Nice shopping!</div>}

       

     

        {isSignedIn && (
          <div>
            <button className="sign-out-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </header>


      <body>
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
       
      </body>
    </div>
  );
};

export default Products;