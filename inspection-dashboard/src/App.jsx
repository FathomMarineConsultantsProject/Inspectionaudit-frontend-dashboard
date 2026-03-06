import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inspectors from "./pages/Inspectors";
import Quotation from "./pages/Quotation";
import SubmitQuotation from "./pages/SubmitQuotation";
import Inspections from "./pages/Inspections";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // 🔐 Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public Route */}
        <Route path="/" element={<Login setAuth={setIsAuthenticated} />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inspectors"
          element={
            <ProtectedRoute>
              <Inspectors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quotation"
          element={
            <ProtectedRoute>
              <Quotation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit-quotation"
          element={
              <SubmitQuotation />
          }
        />

        <Route
          path="/inspections"
          element={
            <ProtectedRoute>
              <Inspections />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;