import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import SignIn from "./pages/Auth/SignIn/Signin.js";
import SignUp from "./pages/Auth/SignUp/SignUp.js";
import Products from "./pages/Products/Products.js";
import ProductDetail from "./pages/ProductDetail/ProductDetail.js";
import Profile from "./pages/Profile/Profile.js";
import MyOrder from "./pages/MyOrder/MyOrder.js";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute.js";
import Cart from "./pages/Cart/Cart.js";
import Error404 from "./pages/Error404/Error404.js";
import Admin from "./pages/Admin/Admin.js";
import AdminOrders from "./pages/Admin/Orders/Orders.js";
import AdminProducts from "./pages/Admin/Products/Products.js";
import AdminHome from "./pages/Admin/Home/Home.js";
import AdminProductDetail from "./pages/Admin/AdminProductDetail/AdminProductDetail.js";
import AddProduct from "./pages/Admin/Products/AddProduct/AddProduct.js";
import AboutUs from "./pages/AboutUs/AboutUs.js";
import Footer from "./pages/Footer/Footer.js";

function App() {
  return (
    <Router>
      <div>
        <Navbar background={"gray.100"} />
      </div>

      <div className="content">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-orders" element={<MyOrder />} />
          </Route>

          <Route element={<ProtectedRoute admin={true} />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/add" element={<AddProduct />} />
            <Route
              path="/admin/products/product/:product_id"
              element={<AdminProductDetail />}
            />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>

      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
