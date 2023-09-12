
import { Link } from 'react-router-dom';
import  {AuthContext} from "./AuthContext.jsx"
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Header.css";


const Header = () => {
  const { isSignedIn, userName,handleSignOut, handleSignIn} = useContext(AuthContext); 
 const navigate = useNavigate()

 const handleAuthentication = () => {
  if (isSignedIn) {
    handleSignOut(); 
    navigate('/');
  } else {
    navigate('/sign-in');
  }
};

return (
  <header>
    <div className="logo">Where Nature's Beauty Blossoms</div>
    <div>
      {isSignedIn ? (
        <>
          { <div className="user-name">{userName}</div>}
        </>
      ) : (
        <Link className="product-link" to="/products/create-product">
          Administration
        </Link>
      )}
    </div>
    <div>
      <button className='sign-in-button' onClick={handleAuthentication}>
        {isSignedIn? 'Sign Out' : 'Sign In'}
      </button>
    </div>
  </header>
);
};


export default Header;