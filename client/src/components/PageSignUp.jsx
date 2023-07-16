import axios from "axios";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../css/PageSignUp.css";

const PageSignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordTwo, setUserPasswordTwo] = useState(""); // Added state for repeat password
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      userName,
      userEmail,
      userPassword,
      userPasswordTwo,
    };

    try {
      await axios.post("http://localhost:5000/users/create-user", data);
      navigate("/sign-in");
    } catch (err) {
      setErrorMessage(err.request.response);
    }
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={submitHandler}>
        <input
          className="input"
          type="name"
          id="name"
          name="name"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          className="input"
          type="email"
          id="userEmail"
          name="userEmail"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          id="userPassword"
          name="userPassword"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <input
          className="input"
          type="password"
          id="userPasswordTwo"
          name="userPasswordTwo"
          placeholder="Repeat password"
          value={userPasswordTwo}
          onChange={(e) => setUserPasswordTwo(e.target.value)} // Updated to setUserPasswordTwo
        />

        <div>
          <button className="submit-btn" type="submit">
            Register
          </button>
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <p className="p-link-text">
          Already have an account?{" "}
          <NavLink className="p-link" to="/sign-in">
            Sign In!
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default PageSignUp;
