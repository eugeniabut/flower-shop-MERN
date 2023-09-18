import axios from "axios";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../css/SignForm.css";
import Header from "./Header";
import Body from "./Body";

const PageSignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordTwo, setUserPasswordTwo] = useState("")
 
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (userPassword !== userPasswordTwo) {
      setErrorMessage("Passwords do not match");
      return;
    }
console.log("Data being sent:", {
  userName,
  userEmail,
  userPassword,
})
    const data = {
      userName,
      userEmail,
      userPassword,
     
    };

    try {
      await axios.post("http://localhost:5000/users/create-user", data);
      navigate("/sign-in");
    } catch (err) {
      setErrorMessage(err.request.response);
    }
  };

  return (
    <div>
    <Header/>
    <Body/>
    <div className="login-container">
    <button type="button" className="btn-close-form" onClick={()=>{navigate("/#")}} >
  <span >×</span>
</button>
      <form className="form" onSubmit={submitHandler}>
      <div className="form-field">
        <input
          className="input"
          type="name"
          id="name"
          name="name"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
</div>
<div className="form-field">
        <input
          className="input"
          type="email"
          id="userEmail"
          name="userEmail"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
</div>
<div className="form-field">
        <input
          className="input"
          type="password"
          id="userPassword"
          name="userPassword"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
 </div>       
<div className="form-field">
        <input
          className="input"
          type="password"
          id="userPasswordTwo"
          name="userPasswordTwo"
          placeholder="Repeat password"
          value={userPasswordTwo}
          onChange={(e) => setUserPasswordTwo(e.target.value)} 
        />
</div>
        <div>
          <button className="submit-btn" type="submit">
            Register
          </button>
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <p className="p-link-text">
          {" "}
          <NavLink className="p-link" to="/sign-in">
            Sign In!
          </NavLink>
        </p>
      </form>
    </div>
    </div>
  );
};

export default PageSignUp;
