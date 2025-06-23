import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api';
import './Dashboard.css';

const Dashboard = ({ isAdmin, handleLogout, notification, setNotification }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    patients: 0,
    queue: 0,
    beds: { total: 0, available: 0, occupied: 0 },
    ambulances: { total: 0, available: 0 },
    bloodBank: { totalUnits: 0, criticalTypes: 0 },
    doctors: 0,
    criticalAlerts: []
  });
  const [roomsData, setRoomsData] = useState([]);
  const [systemAlertsCount, setSystemAlertsCount] = useState(0);

  useEffect(() => {
    const loadRoomsData = () => {
      const savedData = localStorage.getItem('roomsData');
      if (savedData) {
        setRoomsData(JSON.parse(savedData));
      }
    };

    loadRoomsData();
    window.addEventListener('storage', loadRoomsData);
    return () => window.removeEventListener('storage', loadRoomsData);
  }, []);

  const totalBeds = roomsData.reduce((sum, room) => sum + room.total, 0);
  const occupiedBeds = roomsData.reduce((sum, room) => sum + room.occupied, 0);
  const availableBeds = roomsData.reduce((sum, room) => sum + room.available, 0);

  const getAmbulanceCounts = () => {
    const storedAmbulances = JSON.parse(localStorage.getItem('ambulances') || '[]');
    return {
      total: storedAmbulances.length,
      available: storedAmbulances.filter(amb => amb.status === 'Available').length
    };
  };

  const getBloodBankData = () => {
    const bloodStock = JSON.parse(localStorage.getItem('bloodStock') || '[]');
    return {
      totalUnits: bloodStock.reduce((sum, blood) => sum + blood.units, 0),
      criticalTypes: bloodStock.filter(blood => blood.units < 5).length
    };
  };

  const calculateSystemAlerts = () => {
    const rooms = JSON.parse(localStorage.getItem('roomsData') || '[]');
    const blood = JSON.parse(localStorage.getItem('bloodStock') || '[]');
    const ambulances = JSON.parse(localStorage.getItem('ambulances') || '[]');

    const bedAlerts = rooms.filter(room => (room.total - room.occupied) <= 5).length;
    const bloodAlerts = blood.filter(b => b.units < 5).length;
    const availableAmbulances = ambulances.filter(amb => amb.status === 'Available');
    const ambulanceAlerts = (ambulances.length > 0 && availableAmbulances.length === 0) ? 1 : 0;

    return bedAlerts + bloodAlerts + ambulanceAlerts;
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('/api/dashboard/stats');
      const stats = response.data;

      const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]');
      const doctorCount = storedDoctors.length;

      const ambulanceCounts = getAmbulanceCounts();
      const bloodData = getBloodBankData();
      const systemAlerts = calculateSystemAlerts();

      setData({
        patients: stats.patientTotal || 0,
        queue: stats.queueCount || 0,
        beds: {
          total: totalBeds,
          available: availableBeds,
          occupied: occupiedBeds
        },
        ambulances: ambulanceCounts,
        bloodBank: {
          totalUnits: bloodData.totalUnits,
          criticalTypes: bloodData.criticalTypes
        },
        doctors: doctorCount,
        criticalAlerts: stats.criticalAlerts || []
      });
      setSystemAlertsCount(systemAlerts);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    }
  }, [totalBeds, availableBeds, occupiedBeds]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const totalResources = data.patients + data.queue + data.beds.total +
    data.ambulances.total + data.bloodBank.totalUnits + data.doctors;

  const handleCardClick = (path) => navigate(path);
  const handleCriticalClick = () => navigate('/critical-alerts');

  return (
    <div className="dashboard-container">
      {notification && (
        <div className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)}>×</button>
        </div>
      )}

      <div className="dashboard-header">
        <div className="header-title">
          <h1>HospiTrack Dashboard</h1>
          <p className="welcome-message">{isAdmin ? 'Administrator View' : 'Staff View'}</p>
        </div>
        <div className="header-controls">
          {isAdmin && <div className="admin-badge"><span className="icon">🛡️</span> Admin Mode</div>}
          <button className="logout-button" onClick={handleLogout}>
            <span className="icon">🚪</span> Logout
          </button>
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-item total-resources">
          <span className="stat-number">{totalResources}</span>
          <span className="stat-label">Total Resources</span>
        </div>
        <div
          className={`stat-item critical-alerts ${data.criticalAlerts.length + systemAlertsCount > 0 ? 'has-alerts' : ''}`}
          onClick={handleCriticalClick}
        >
          <span className="stat-number">{data.criticalAlerts.length + systemAlertsCount}</span>
          <span className="stat-label">Critical Alerts</span>
          {(data.criticalAlerts.length + systemAlertsCount) > 0 && <div className="alert-indicator">!</div>}
        </div>
        <div className="stat-item active-patients">
          <span className="stat-number">{data.patients + data.queue}</span>
          <span className="stat-label">Active Patients</span>
        </div>
      </div>

      <h2 className="section-title">Hospital Management</h2>
      <div className="cards-grid">
        <div className="dashboard-card queue-card" onClick={() => handleCardClick('/queue')}>
          <div className="card-icon">👥</div>
          <div className="card-content">
            <h3>Queue</h3>
            <p className="count">{data.queue}</p>
            <p className="card-description">Patients waiting in real-time</p>
          </div>
        </div>

        <div className="dashboard-card beds-card" onClick={() => handleCardClick('/rooms-and-beds')}>
          <div className="card-icon">🛏️</div>
          <div className="card-content">
            <h3>Rooms & Beds</h3>
            <p className="count">{data.beds.occupied}/{data.beds.total}</p>
            <p className="card-description">
              {data.beds.total > 0
                ? `${Math.round((data.beds.occupied / data.beds.total) * 100)}% occupied`
                : 'Loading...'}
            </p>
          </div>
        </div>

        <div className="dashboard-card ambulance-card" onClick={() => handleCardClick('/ambulance-services')}>
          <div className="card-icon">🚑</div>
          <div className="card-content">
            <h3>Ambulance Service</h3>
            <p className="count">{data.ambulances.available}/{data.ambulances.total}</p>
            <p className="card-description">Ambulances available</p>
          </div>
        </div>

        <div className="dashboard-card blood-card" onClick={() => handleCardClick('/blood-bank')}>
          <div className="card-icon">💉</div>
          <div className="card-content">
            <h3>Blood Bank</h3>
            <p className="count">{data.bloodBank.totalUnits}</p>
            <p className="card-description">{data.bloodBank.criticalTypes} types critical</p>
          </div>
        </div>

        {isAdmin && (
          <div className="dashboard-card patients-card" onClick={() => handleCardClick('/patients')}>
            <div className="card-icon">🧑‍⚕️</div>
            <div className="card-content">
              <h3>Patients</h3>
              <p className="count">{data.patients}</p>
              <p className="card-description">Total patients in system</p>
            </div>
          </div>
        )}

        <div className="dashboard-card doctors-card" onClick={() => handleCardClick('/doctor-timings')}>
          <div className="card-icon">⏰</div>
          <div className="card-content">
            <h3>Doctor Timings</h3>
            <p className="count">{data.doctors}</p>
            <p className="card-description">Doctors on duty</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
