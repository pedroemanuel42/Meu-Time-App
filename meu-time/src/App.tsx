import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";

//Pages
import Login from "../src/pages/login/Login";
import Home from "../src/pages/home/Home";

import "./App.scss";
import { ApiKeyProvider } from "./context/ApiKeyContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ApiKeyProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </ApiKeyProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
