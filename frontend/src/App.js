import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import InsurenceDashboard from "./pages/dashboard/InsurenceDashboard";
import TPADashboard from "./pages/dashboard/TPADashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import FraudDashboard from "./pages/dashboard/FraudDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/fraud-dashboard" element={<FraudDashboard />} />

        {/* Protected Routes */}
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/insurence-dashboard"
          element={
            <ProtectedRoute allowedRoles={["insurance"]}>
              <InsurenceDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tpa-dashboard"
          element={
            <ProtectedRoute allowedRoles={["tpa"]}>
              <TPADashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
