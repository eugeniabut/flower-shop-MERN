import React, { useState, useEffect } from "react";

import "../css/PageMain.css";

import PageSignInForm from "./PageSignInForm.jsx";
import axios from "axios";

import { useNavigate, NavLink } from "react-router-dom";

const PageMain = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");

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

  const navigate = useNavigate();
  const showProductsHandler = () => {
    navigate("products/all-products");
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  return (
    <div>
      <header>
        <div className="logo">Where Nature's Beauty Blossoms</div>
        <div>
          <NavLink className="product-link" to="/products/create-product">
            Products
          </NavLink>
        </div>

        <div>
          {isSignedIn ? (
            <div>
              {" "}
              <PageSignInForm />
            </div>
          ) : (
            <div>
              <button className="sign-in-button" onClick={handleSignIn}>
                Sign In
              </button>
            </div>
          )}
        </div>
      </header>

      <body>
        <div className="body-container">
          <div className="shop-btn-container">
            <button className="shop-btn" onClick={showProductsHandler}>
              Flower Shop
            </button>
          </div>
        </div>
      </body>
    </div>
  );
};

export default PageMain;
