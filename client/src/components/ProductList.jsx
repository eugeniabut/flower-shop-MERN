import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.jsx';
import { NavLink } from 'react-router-dom';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({
    productImage: '',
    productName: '',
    productPrice: '',
    productAmount: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch products from the backend endpoint
    axios
      .get('http://localhost:5000/products/all-products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const { isSignedIn, handleSignIn, handleSignOut } = useContext(AuthContext);

  const editProductData = (productId) => {
    const selectedProduct = products.find((product) => product._id === productId);
    if (selectedProduct) {
      setEditProduct(selectedProduct);
    }
  };

  const handleEditInputChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make an API request to update the product
      const response = await axios.put(
        `http://localhost:5000/products/all-products/${editProduct._id}`,
        editProduct
      );
      console.log('Product updated:', response.data);
      // Implement any additional logic after successful update, such as showing a success message

      // Reset the edited values
      setEditProduct({
        productImage: '',
        productName: '',
        productPrice: '',
        productAmount: '',
      });
    } catch (error) {
      console.error('Error updating product:', error);
      // Implement error handling logic, such as displaying an error message
      setMessage('Error updating product');
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/all-products/${productId}`);
      console.log(`Product with ID ${productId} deleted successfully`);

      // Update the product list by filtering out the deleted product
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      // Display an error message to the user
      setMessage('Error deleting product: ' + error.message);
    }
  };

  return (
    <div className="products">
       <header>
        <h2>Administrator</h2>
        <div className="links">
          <NavLink to="/products/create-product">Create Product</NavLink>
          <NavLink to="/products/all-products">Shop</NavLink>
          <NavLink to="/">Logout</NavLink>
        </div>
      </header>
      <h1>Product List</h1>
      <table className="table">
        <thead>
          <tr className='table-header'>
            <th scope="col">Product Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Amount</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className='table-body'>
          {products.map((product) => (
            <tr key={product._id} >
              <td>
                {product.productImage && (
                  <img src={product.productImage} alt={product.productName} className="table-image" />
                )}
              </td>
              <td>{product.productName}</td>
              <td>{product.productPrice}</td>
              <td>{product.productAmount}</td>
              <td>
                <button className="btn btn-primary" onClick={() => editProductData(product._id)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => deleteProduct(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editProduct._id && (
        <div className="edit-form">
          <h2>Edit Product</h2>
          <form onSubmit={handleEditSubmit}>
            <div className='edit-product-input'>
              <label>Product Name:</label>
              <input
                type="text"
                name="productName"
                value={editProduct.productName}
                onChange={handleEditInputChange}
              />
            </div>
            <div className='edit-product-input'>
              <label>Product Price:</label>
              <input
                type="number"
                name="productPrice"
                value={editProduct.productPrice}
                onChange={handleEditInputChange}
              />
            </div>
            <div className='edit-product-input'>
              <label>Product Amount:</label>
              <input
                type="number"
                name="productAmount"
                value={editProduct.productAmount}
                onChange={handleEditInputChange}
              />
            </div>
            <button type="submit" className='edit-product-submit'>Save Changes</button>
          </form>
        </div>
      )}

      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default ProductList;
