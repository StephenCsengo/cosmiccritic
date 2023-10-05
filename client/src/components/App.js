import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar.js";
import Home from "./Home.js";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
