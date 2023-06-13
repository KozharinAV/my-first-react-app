import { useState } from "react";
import Header from "./components/header/Header";
import "./common/scss/style.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
