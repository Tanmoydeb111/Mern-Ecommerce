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
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import SignupScreen from './screens/SignupScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import AboutUs from './screens/AboutUs';
import ProductPage from './screens/ProductPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="bg-white pt-16">
        <header>
          <Link to="/">StudioNupur</Link>
        </header>
        <main>
          <ToastContainer position="bottom-center" limit={1} />
          <Routes>
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />

            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/product/:id"
              element={
                <AdminRoute>
                  <ProductEditScreen />
                </AdminRoute>
              }
            ></Route>
            <Route path="/" element={<HomeScreen />} />
            {/* <Route path="/profile" element={<ProfileScreen />} /> */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            {/* <Route path="/order/:id" element={<OrderScreen />}></Route>*/}
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/productpage" element={<ProductPage />} />
            <Route
              path="/orderhistory"
              element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            ></Route>
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
