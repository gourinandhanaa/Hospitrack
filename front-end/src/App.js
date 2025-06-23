import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CriticalAlertsPage from './pages/CriticalAlertsPage';
import Queue from './pages/Queue';
import RoomsAndBeds from './pages/RoomsAndBeds';
import AmbulanceServices from './pages/AmbulanceServices';
import BloodBank from './pages/BloodBank';
import Patients from './pages/Patients';
import DoctorTimings from './pages/DoctorTimings';

import { HospiTrackProvider } from './context/HospiTrackContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem('isAdmin') === 'true'
  );
  const [notification, setNotification] = useState(null);

  const handleLogin = useCallback((adminStatus) => {
    setIsAuthenticated(true);
    setIsAdmin(adminStatus);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isAdmin', adminStatus.toString());
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
  }, []);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
    const storedAdmin = localStorage.getItem('isAdmin') === 'true';

    if (storedAuth !== isAuthenticated) {
      setIsAuthenticated(storedAuth);
    }
    if (storedAdmin !== isAdmin) {
      setIsAdmin(storedAdmin);
    }
  }, [isAuthenticated, isAdmin]);

  return (
    <HospiTrackProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard
                    isAdmin={isAdmin}
                    handleLogout={handleLogout}
                    notification={notification}
                    setNotification={setNotification}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/critical-alerts"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CriticalAlertsPage isAdmin={isAdmin} />
                </ProtectedRoute>
              }
            />

            {/* Guest-accessible routes */}
            <Route
              path="/queue"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Queue isAdmin={isAdmin} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/rooms-and-beds"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <RoomsAndBeds isAdmin={isAdmin} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ambulance-services"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AmbulanceServices isAdmin={isAdmin} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/blood-bank"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <BloodBank isAdmin={isAdmin} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/patients"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Patients isAdmin={isAdmin} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor-timings"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DoctorTimings isAdmin={isAdmin} />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />}
            />
          </Routes>
        </div>
      </Router>
    </HospiTrackProvider>
  );
}

// Reusable route protection wrapper
function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default App;
