import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WireBarley from "./pages/WireBarley";
import RedBrick from "./pages/RedBrick";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WireBarley />} />
        <Route path="/RedBrick" element={<RedBrick />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
