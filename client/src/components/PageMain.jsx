import Header from "./Header";
import Body from "./Body";
import "../css/PageMain.css";
import { NavLink } from "react-router-dom";

const PageMain = () => {
 
return (
    <div>
      <Header />
      <Body/>

      <div className="shop-btn-container">
        <NavLink to="/products/all-products">
          <button className="shop-btn">Flower Shop</button>
        </NavLink>
      </div>
    
    </div>
  );
};

export default PageMain;
