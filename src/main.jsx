import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { CryptoProvider } from "./cryptoprovider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <CryptoProvider>
      <App />
      
     </CryptoProvider>
  </StrictMode>
    

   

);
