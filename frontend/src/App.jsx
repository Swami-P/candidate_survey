import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import SurveyPage from "./pages/SurveyPage.jsx";
import Reports from "./pages/Reports.jsx";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <div className="brand">CelcomDigi Candidate Survey</div>
        <nav>
          <Link to="/" className="accent">Admin</Link>
          <Link to="/reports">Reports</Link>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/s/:token" element={<SurveyPage />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
