import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.jsx";
import { EmployeesContextProvider } from "./context/EmployeeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EmployeesContextProvider>
      <App />
      <Toaster />
    </EmployeesContextProvider>
  </React.StrictMode>
);
