import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../css/Basket.css';

const Basket = ({ basket, productName, productPrice, onDeleteItem }) => {
  // Function to calculate the total price of items in the basket
  const calculateTotal = (basket) => {
    return basket.reduce((total, item) => total + item.productPrice, 0);
  };

  return (
    <div className='basket-container'>
      <div className='basket-icon'>
        <FontAwesomeIcon icon={faBasketShopping} />
      </div>
    
      <div>
        <ol>
          {basket.map((item, index) => (
            <li className='basket-list' key={index}>
              <span>{item.productName}</span>
              <span>{item.productPrice.toFixed(2)} €</span>
              <FontAwesomeIcon
                icon={faTrash}
                className='delete-icon'
                onClick={() => onDeleteItem(index)} // Call onDeleteItem with the index of the item to delete
              />
            </li>
          ))}
        </ol>
      </div>
      
      <div>
        <h3>Total: {calculateTotal(basket).toFixed(2)} €</h3>
      </div>
    </div>
  );
};

export default Basket;