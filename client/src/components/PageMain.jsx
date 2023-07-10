import React, { useState } from 'react';
import heroImage from '../images/heroImage.jpg';
import SandwichMenu from './SandwichMenu';
import PageSignInForm from "./PageSignInForm.jsx"


const PageMain = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogInToggle =()=>{
setIsSignIn(!isSignIn);
  }

  const handleSignUpToggle = ()=>{
    setIsSignUp(!isSignUp)
  }

  return (
    <div>
      <header>
        <div className="sandwich-menu" onClick={handleMenuToggle}>
          ☰
        </div>
        <div className="logo">Logo</div>
        <div className="search-field">
          <input type="text" placeholder="Search" />
        </div>
        <  button className="sign-in-button" onClick={handleLogInToggle}>Sign In</button>
       
      </header>

      {isMenuOpen && <SandwichMenu/>}
       
     
      {isSignIn && <PageSignInForm/>}
     
      
      

      <div className="hero-image">
        <img src={heroImage} alt="Hero" />
        <button className='shop-btn'>Shop</button>
      </div>
    </div>
  );
};

export default PageMain;