import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import PageSignIn from './components/PageSignIn.jsx';
import PageSignUp from './components/PageSignUp.jsx';
import PageMain from './components/PageMain.jsx';
import Products from './components/Products.jsx';
import ProductCreate from './components/ProductCreate.jsx';
import ProductList from "./components/ProductList.jsx";
import Basket from './components/Basket.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import { AuthProvider } from "./components/AuthContext"


function App() {
  return (
    <div className="App">
     <AuthProvider> 

      <Routes>
        <Route path='/' element={<PageMain />} />
        <Route path='/sign-in' element={<PageSignIn/>}/>
        <Route path='/sign-up' element={<PageSignUp />}/>
        <Route path='/products/basket' element={<Basket/>} />
        <Route path='/products/all-products' element={<Products/>} />
        <Route path='/products/all-products-list' element={<ProductList/>} />
        <Route path='/products/create-product' element={<ProductCreate/>} /> 
      </Routes>

      </AuthProvider>
    </div>
  );
}

export default App;
