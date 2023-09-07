import React from "react";
import "../css/SignForm.css";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx"
import Body from "./Body";
import { AuthContext } from "./AuthContext.jsx";


const PageSignIn = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { handleSignIn} = useContext(AuthContext);

  const handleSubmit= async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `http://localhost:5000/users/sign-in`,
        {
          userName,
          userPassword,
        }
      );
  
      if (response.status === 201 || response.status === 200) {

        // Set the userName in context when the user signs in
        handleSignIn(response.data.userName);
        navigate("/products/all-products");
      } else {
        setErrorMessage("Unexpected response status");
      }
    } catch (error) {
      setErrorMessage("Please try again or register");
    }
  };
  

  const handleForgotPassword = (e) => {
    e.preventDefault()
    navigate("/forgot-password");
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div>
       <  Header  />
       <Body/>
    <div className="login-container">
      

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            className="input"
            type="text"
           
            name="userName"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="form-field">
          <input
            className="input"
            type="password"
       
            name="userPassword"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
         <div>
          <button className="submit-btn" type="submit">
          Sign In
        </button>
        
         </div>
        

        <p className="p-link-text" onClick={handleForgotPassword}>
          Forgot Password?
        </p>
        <p className="p-link" onClick={handleSignUp}>
          Register
        </p>
<div>
         {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      </form>
      
     
    </div>
    </div>
  );
};

export default PageSignIn;

