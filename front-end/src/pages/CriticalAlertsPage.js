import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const CriticalAlertsPage = ({ isAdmin }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [systemAlerts, setSystemAlerts] = useState([]);

  const initialAlerts = useMemo(() => state?.alerts || [], [state]);
  const [allAlerts, setAllAlerts] = useState([...initialAlerts]);

  useEffect(() => {
    const checkSystemStatus = () => {
      const newAlerts = [];
      
      // Bed Status Check
      const roomsData = JSON.parse(localStorage.getItem('roomsData') || []);
      roomsData.forEach(room => {
        if (room.total - room.occupied <= 5) {
          newAlerts.push({
            id: `bed-${room.id}`,
            type: 'Bed Shortage',
            message: `Critical bed availability in ${room.name}: Only ${room.total - room.occupied} beds left`,
            status: 'active',
            timestamp: new Date().toISOString()
          });
        }
      });

      // Blood Bank Check
      const bloodStock = JSON.parse(localStorage.getItem('bloodStock') || []);
      bloodStock.forEach(bloodType => {
        if (bloodType.units < 5) {
          newAlerts.push({
            id: `blood-${bloodType.type}`,
            type: 'Blood Shortage',
            message: `Critical blood level for ${bloodType.type}: ${bloodType.units} units remaining`,
            status: 'active',
            timestamp: new Date().toISOString()
          });
        }
      });

      // Ambulance Check (Fixed Logic)
      const ambulances = JSON.parse(localStorage.getItem('ambulances') || []);
      const availableAmbulances = ambulances.filter(a => a.status === "Available");
      if (availableAmbulances.length === 0 && ambulances.length > 0) {
        newAlerts.push({
          id: 'ambulance-unavailable',
          type: 'Ambulance Unavailable',
          message: 'No ambulances are currently available. Immediate action required!',
          status: 'active',
          timestamp: new Date().toISOString()
        });
      }

      setSystemAlerts(newAlerts);
    };

    checkSystemStatus();
    const interval = setInterval(checkSystemStatus, 5000);
    window.addEventListener('storage', checkSystemStatus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkSystemStatus);
    };
  }, []);

  useEffect(() => {
    setAllAlerts([...initialAlerts, ...systemAlerts]);
  }, [initialAlerts, systemAlerts]);

  const handleResolveAlert = (id) => {
    setAllAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back to Dashboard
        </button>
        <h1>Critical Alerts</h1>
      </div>

      <div className="alerts-container">
        {allAlerts.length > 0 ? (
          allAlerts.map(alert => (
            <div key={alert.id} className="alert-card">
              <div className="alert-header">
                <h3 className="alert-type">{alert.type}</h3>
                <span className={`alert-status ${alert.status}`}>{alert.status}</span>
              </div>
              <div className="alert-details">
                <p>{alert.message}</p>
                <p><strong>Time Reported:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
              </div>
              {isAdmin && alert.status === 'active' && (
                <div className="alert-actions">
                  <button 
                    className="action-button resolve"
                    onClick={() => handleResolveAlert(alert.id)}
                  >
                    Mark as Resolved
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-alerts">
            <p>No critical alerts at this time</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CriticalAlertsPage;