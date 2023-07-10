import "./PageSignInForm.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageSignInForm = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(` ${process.env.REACT_APP_BE_URL}/users/sign-in`, 
      {
        userName,
        userPassword,
      });
      console.log(response);
  
      // Check the response status
      if (response.status === 201 || response.status === 200) {
        navigate("/products");
      } else {
        // Handle other response statuses or errors
        setErrorMessage("Unexpected response status");
      }
    } catch (error) {
      setErrorMessage("Please try again or register");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };


  return (
    <div className="login-container">
      <div className="login-form">

      {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-field">

            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="form-field">
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>

          <button className="submit-btn" type="submit">
            Sign In
          </button>

          <div className="form-field" />

          <div className="form-links">
            <p onClick={handleForgotPassword}>Forgot Password?</p>
            <p onClick={handleSignUp}> Register</p>
          </div>


        </form>

       
      </div>
    </div>
  );
};


export default PageSignInForm;
