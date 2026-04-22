
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Pets from "./pages/Pets";
import Services from "./pages/Services";
import ServiceItems from "./pages/ServiceItems";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Subscribe from "./pages/Subscribe";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import PetAI from "./pages/PetAI";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AddPet from "./pages/admin/AddPet";
import Users from "./pages/admin/Users";

import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:type" element={<ServiceItems />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
          <Route path="/pet-ai" element={<PetAI />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-pet" element={<AddPet />} />
          <Route path="/admin/users" element={<Users />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}
