import { useState } from 'react';
import { Link } from 'react-router-dom';

const SandwichMenu = () => {
  
  return (
    
     
        <div className="menu-links">
          <ul>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
     
   
  );
};

export default SandwichMenu;