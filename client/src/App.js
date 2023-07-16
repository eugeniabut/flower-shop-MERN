import './App.css';
import { Routes, Route } from "react-router-dom";
import PageSignInForm from './components/PageSignInForm';
import PageSignUp from './components/PageSignUp';
import PageMain from './components/PageMain';
import Products from './components/Products';
import ProductCreate from './components/ProductCreate';
import ProductList from "./components/ProductList";
import 'bootstrap/dist/css/bootstrap.css';



function App() {
  return (
    <div className="App">
    

      <Routes>
        <Route path='/' element={<PageMain />} />
        <Route path='/sign-in' element={<PageSignInForm />}/>
        <Route path='/sign-up' element={<PageSignUp />}/>
        <Route path='/products/all-products' element={<Products/>} />
        <Route path='/products/all-products-list' element={<ProductList/>} />
        <Route path='/products/create-product' element={<ProductCreate/>} />
        
      
        
      </Routes>
    </div>
  );
}

export default App;
