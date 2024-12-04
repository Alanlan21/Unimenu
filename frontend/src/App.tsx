import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";
import UserRegistration from "./pages/registration";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Kalzone from "./pages/kalzone";
import Checkout from "./pages/checkout";
import Orders from "./pages/orders";

// Sua chave pública do Stripe
const stripePromise = loadStripe('sua-chave-publica-do-stripe');

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/pedidos" element={<Orders />} />
        <Route path="/minikalzone" element={<Kalzone />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        {/* Aqui, envolva a página Checkout com Elements */}
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
