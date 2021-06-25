import App from "./App";
import ReactDOM from "react-dom";
import React, { Component } from "react";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
