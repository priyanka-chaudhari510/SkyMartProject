import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
 import { ToastContainer} from 'react-toastify';
import CartContext from "./Context/CartContext.jsx";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <CartContext>
      <AppRoutes /> 
    <ToastContainer />
  </CartContext>
  </AuthProvider>,
);
