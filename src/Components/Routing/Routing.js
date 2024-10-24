import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "../Products/Products";
import ProductDetail from "../Products/ProductDetail";

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default Routing;
