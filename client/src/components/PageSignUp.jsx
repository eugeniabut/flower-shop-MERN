import "./PageSignInForm.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const PageSignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordTwo, setUserPasswordTwo] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

   
 const data =    {
          userName,
          userEmail,
          userPassword,
          userPasswordTwo
        }
  

    try {
      await axios.post(
        "http:localhost3000/users/create-user", data
     
      );
     
      navigate("/sign-in");
    } catch (err) {
      setErrorMessage(err.request.response);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        
        <form onSubmit={submitHandler}>
          <div className="form-field">
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <input
              type="email"
              id="userEmail"
              name="userEmail"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />

            <input
              type="password"
              id="userPassword"
              name="userPassword"
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />

            <input
              type="password"
              id="userPasswordTwo"
              name="userPasswordTwo"
              placeholder="Confirm Password"
              value={userPasswordTwo}
              onChange={(e) => setUserPasswordTwo(e.target.value)}
            />

            <button className="submit-btn" type="submit">
              Register
            </button>

            <div className="form-field" />

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <p>
              Already have an account? <NavLink to="/sign-in">Sign In</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageSignUp;