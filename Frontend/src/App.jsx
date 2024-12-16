import React from "react";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";
import ItemPage from "./pages/ItemPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/List/:type" element={<ItemsPage />} />
        <Route path="/Item/:id" element={<ItemPage />} />
        <Route path="/my_cart" element={<CartPage />} />
      </Routes>
    </Router>
  )
}