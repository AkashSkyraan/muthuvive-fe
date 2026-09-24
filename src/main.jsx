import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { SignupProvider } from "./context/SignupContext.jsx";
import { AuthProvider } from "./context/UserContext.jsx";
import { LoaderProvider } from "./context/LoaderContext.jsx";

createRoot(document.getElementById("root")).render(
  <SignupProvider>
    <StrictMode>
      <LoaderProvider>
        <SearchProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SearchProvider>
      </LoaderProvider>
    </StrictMode>
  </SignupProvider>,
);
