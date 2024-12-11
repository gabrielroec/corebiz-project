import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Organism/Header/Header";
import { CartProvider } from "./lib/context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
