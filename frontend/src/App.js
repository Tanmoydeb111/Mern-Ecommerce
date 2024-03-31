import data from './data';
import logo from './logo.svg';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import FooterCus from './components/footerCus';
import Navbar from './components/Navbar';
import './App.css';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="bg-slate-800 ">
        <header>
          <Link to="/">StudioNupur</Link>
        </header>
        <main>
          <Routes>
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
          </Routes>
        </main>

        <FooterCus />
      </div>
    </BrowserRouter>
  );
}

export default App;
