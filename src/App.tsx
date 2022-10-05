import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import History from "./pages/History";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Transaction from "./pages/Transaction";

function App() {
  return (
    <div className="App">
      <div className="container mx-auto">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
