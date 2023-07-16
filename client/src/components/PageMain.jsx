import React, { useState,useEffect } from 'react';
import heroImage from '../images/heroImage.jpg';

import PageSignInForm from "./PageSignInForm.jsx"
import axios from "axios"

import { useNavigate, NavLink} from 'react-router-dom';


const PageMain = () => {
  
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('');
 

  useEffect(() => {
    if (isSignedIn) {
      fetchUserName();
    }
  }, [isSignedIn]);




  const fetchUserName = () => {
    axios
      .get("http:localhost:5000/users/get-user")
      .then((response) => {
        setUserName(response.data.userName);
      })
      .catch((error) => {
        console.log(error);
      });
  };



const navigate = useNavigate()
const showProductsHandler=()=>{
navigate("products/all-products")
  }

const handleSignIn = ()=>{
  setIsSignedIn(true)
}


  return (
    <div>
      <header>

        <div className="logo">Logo</div>
        <NavLink className="product-link" to='/products/create-product'>
            Products
          </NavLink>
        <div className="search-field">
          <input type="text" placeholder="Search" />
          </div>


        <div>
        <div>
      {isSignedIn ? (
        <div> <PageSignInForm/> &&
          <p>Welcome, {userName}!</p>  
        </div>
      ) : (
         
        <div>
          <button className="sign-in-button" onClick={handleSignIn}>Sign In</button>
        </div>
        )}
      </div>
</div>
      </header>


    
    
   
       
    
     
      
      

      <div className="hero-image">
        <img src={heroImage} alt="Hero" />
        <button className='shop-btn' onClick={showProductsHandler}>Shop</button>
      </div>
    </div>
  );
  };

export default PageMain;