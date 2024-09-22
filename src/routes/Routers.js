import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop.jsx";
import Cart from "../pages/Cart";
import ProdukDetails from "../pages/ProductDetails";
// import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import HistoryPembelian from "../pages/HistoryPembelian.jsx";
import ProtectedRoute from "./ProtectedRoute.js";
import ProtectedCheckout from "./ProtectedCheckout.js";

// Admin
import AddProducts from "../admin/AddProducts.jsx";
import EditProducts from "../admin/EditProducts.jsx";
import AllProducts from "../admin/AllProducts.jsx";
import Dashboard from "../admin/Dashboard.jsx";
import Users from "../admin/Users.jsx";
import Orders from "../admin/Orders.jsx";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProdukDetails />} />
      <Route path="history" element={<HistoryPembelian />} />
      <Route path="checkout" element={<ProtectedCheckout />} />

      {/* Rute admin */}
      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/all-products" element={<AllProducts />} />
        <Route path="dashboard/add-product" element={<AddProducts />} />
        <Route path="dashboard/edit-product/:id" element={<EditProducts />} />
        <Route path="dashboard/orders" element={<Orders />} />
        <Route path="dashboard/users" element={<Users />} />
      </Route>
      <Route path="cart" element={<Cart />} />
      {/* <Route
        path="checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      /> */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default Routers;
