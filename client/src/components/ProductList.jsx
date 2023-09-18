import React, { useEffect, useState } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { NavLink } from "react-router-dom";
import "../css/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({
    productImage: "",
    productName: "",
    productPrice: "",
    productAmount: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/products/all-products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const editProductData = (productId) => {
    const selectedProduct = products.find(
      (product) => product._id === productId
    );
    if (selectedProduct) {
      setEditProduct(selectedProduct);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleImageUpload = (file) => {
    setEditProduct({
      ...editProduct,
      productImage: file.base64,
    });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/products/all-products/${editProduct._id}`,
        editProduct
      );
      console.log("Product updated:", response.data);

      setEditProduct({
        productImage: "",
        productName: "",
        productPrice: "",
        productAmount: "",
      });
    } catch (error) {
      console.error("Error updating product:", error);

      setMessage("Error updating product");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/products/all-products/${productId}`
      );
      console.log(`Product with ID ${productId} deleted successfully`);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Error deleting product: " + error.message);
    }
  };

  return (
    <div>
      <header className="header-admin-product-list">
     
          
          <NavLink to="/products/create-product">Create Product</NavLink>

         <NavLink to="/">Home</NavLink>
      
      </header>
      <h1>Product List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
          <th scope="col">Nr</th>
            <th scope="col">Product Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Amount</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td> 
              <td>
                {product.productImage && (
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="table-image"
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  />
                )}
              </td>
              <td>{product.productName}</td>
              <td>{product.productPrice}</td>
              <td>{product.productAmount}</td>
              <td>
                <button
                  className="btn btn-primary btn-edit"
                  style={{ marginRight: "10px", marginTop: "8px" }}
                  onClick={() => editProductData(product._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-delete"
                  style={{ marginTop: "8px" }}
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editProduct._id && (
        <div className="edit-product-container">
          <h2>Edit Product</h2>
          <form onSubmit={handleEditSubmit} className="form-container">
            <div className="form-field">
             
              <label>Product Image:</label>
              <img
                src={editProduct.productImage}
                alt={editProduct.productName}
                className="productImage"
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
              <FileBase64
                type="file"
                multiple={false}
                onDone={handleImageUpload}
              />
            </div>

            <div className="form-field">
              <label>Product Name:</label>
              <input
                type="text"
                name="productName"
                value={editProduct.productName}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="form-field">
              <label>Product Price:</label>
              <input
                type="number"
                name="productPrice"
                value={editProduct.productPrice}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="form-field">
              <label>Product Amount:</label>
              <input
                type="number"
                name="productAmount"
                value={editProduct.productAmount}
                onChange={handleEditInputChange}
              />
            </div>
            <div>
            <button type="submit" className="edit-product-submit">
              Save Changes
            </button></div>
          </form>
        </div>
      )}

      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default ProductList;
