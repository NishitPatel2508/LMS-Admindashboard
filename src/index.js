import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./FrontendComponents/global.css";
import "./User/Test/global.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Provider } from "react-redux";
// import { AuthProvider } from "./Store/auth";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
