import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import { SignupProvider } from "./context/SignupContext.jsx";
import { AuthProvider } from "./context/UserContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { LoginModalProvider } from "./context/LoginModalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SignupProvider>
        <AuthProvider>
          <SearchProvider>
            <LoginModalProvider>
              <App />
            </LoginModalProvider>
          </SearchProvider>
        </AuthProvider>
      </SignupProvider>
    </BrowserRouter>
  </StrictMode>,
);
