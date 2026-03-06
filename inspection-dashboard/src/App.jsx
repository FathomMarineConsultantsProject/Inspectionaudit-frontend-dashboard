import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Inspectors from "./pages/admin/Inspectors";
import Quotation from "./pages/admin/Quotation";
import SubmitQuotation from "./pages/admin/SubmitQuotation";
import Inspections from "./pages/admin/Inspections";
import Reports from "./pages/admin/Reports";
import Profile from "./pages/admin/Profile";
import Settings from "./pages/admin/Settings";

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

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login setAuth={setIsAuthenticated} />} />

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

        {/* Public page for email link */}
        <Route path="/submit-quotation" element={<SubmitQuotation />} />

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

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;