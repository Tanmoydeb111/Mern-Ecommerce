import data from './data';
import logo from './logo.svg';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import FooterCus from './components/footerCus';
import Navbar from './components/Navbar';
import './App.css';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="bg-slate-800 ">
        <header>
          <Link to="/">StudioNupur</Link>
        </header>
        <main>
          <ToastContainer position="bottom-center" limit={1} />
          <Routes>
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route path="/signin" element={<SigninScreen />} />
            {/* <Route path="/shipping" element={<ShippingAddressScreen />} /> */}
          </Routes>
        </main>

        <FooterCus />
      </div>
    </BrowserRouter>
  );
}

export default App;
