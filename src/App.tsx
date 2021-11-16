import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import StockPage from "./components/pages/StockPage";

export default function App() {
  return (
    <div>
      <Router>
        <div>Header</div>
        <div>Menu</div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/stock" element={<StockPage />} />
        </Routes>
      </Router>
    </div>
  );
}
