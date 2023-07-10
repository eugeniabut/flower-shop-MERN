import './App.css';
import { Routes, Route } from "react-router-dom";
import PageSignInForm from './components/PageSignInForm';
import PageSignUp from './components/PageSignUp';
import PageMain from './components/PageMain';
import Products from './components/Products';



function App() {
  return (
    <div className="App">
    

      <Routes>
        <Route path='/' element={<PageMain />} />
        <Route path='/sign-in' element={<PageSignInForm />}/>
        <Route path='/sign-up' element={<PageSignUp />}/>
        <Route path='/products' element={<Products/>} />
      
        
      </Routes>
    </div>
  );
}

export default App;
