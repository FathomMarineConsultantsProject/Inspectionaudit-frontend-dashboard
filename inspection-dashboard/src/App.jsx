import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

/* Pages */
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inspectors from "./pages/Inspectors";
import Quotation from "./pages/Quotation";
import ClientEnquiryForm from "./pages/ClientEnquiryForm";
import ClientEnquirySubmit from "./pages/ClientEnquirysubmit";
import AdmineQuotations from "./pages/admin/AdmineQuotations";
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

  /* Protected Route Wrapper */
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" replace />;
  };

  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Login setAuth={setIsAuthenticated} />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* INSPECTORS */}
        <Route
          path="/inspectors"
          element={
            <ProtectedRoute>
              <Inspectors />
            </ProtectedRoute>
          }
        />

        {/* ADMIN QUOTATION */}
        <Route
          path="/quotation"
          element={
            <ProtectedRoute>
              <Quotation />
            </ProtectedRoute>
          }
        />

        {/* CLIENT ENQUIRY FORM */}
        <Route
          path="/clientenquiryform"
          element={
            <ProtectedRoute>
              <ClientEnquiryForm />
            </ProtectedRoute>
          }
        />

        {/* ADMIN QUOTATIONS LIST */}
        <Route
          path="/admine-quotation"
          element={
            <ProtectedRoute>
              <AdmineQuotations />
            </ProtectedRoute>
          }
        />

        {/* SUBMIT QUOTATION */}
        <Route
          path="/submit-quotation"
          element={<SubmitQuotation />}
        />

        {/* CLIENT ENQUIRY SUBMIT (TOKEN LINK) */}
        <Route
          path="/client-enquiry/:token"
          element={<ClientEnquirySubmit />}
        />

        {/* INSPECTIONS */}
        <Route
          path="/inspections"
          element={
            <ProtectedRoute>
              <Inspections />
            </ProtectedRoute>
          }
        />

        {/* REPORTS */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* SETTINGS */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;