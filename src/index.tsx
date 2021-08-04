import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/auth.context";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(  
    <AuthProvider>
      <App />
    </AuthProvider>,
  document.getElementById("root")
);

reportWebVitals();
