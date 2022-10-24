import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import History from "./pages/History";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Transaction from "./pages/Transaction";

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/recomendations" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
