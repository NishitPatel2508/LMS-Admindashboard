import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./FrontendComponents/global.css"
import './User/Test/global.css'
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AuthProvider } from "./Store/auth";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AuthProvider>

    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthProvider>
  </Provider>
  // </React.StrictMode>
);
