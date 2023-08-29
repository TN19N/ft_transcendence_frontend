// import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { UserProvider } from "./Component/UserContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <UserProvider>
      <App />
  </UserProvider>
    </BrowserRouter>
);
