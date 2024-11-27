import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import UserRegistration from "./pages/registration";
import Login from "./pages/login";
import Dashboard from './pages/dashboard';
// import CartModalTest from './components/CartModalTest';
import Kalzone from "./pages/kalzone";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<UserRegistration />} />{" "}
        <Route path="/minikalzone" element={<Kalzone />} />{" "}
        <Route path="/dashboard" element={<Dashboard />} />{" "}
        <Route path="/login" element={<Login />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
