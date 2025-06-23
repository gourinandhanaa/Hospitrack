import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AmbulanceServices.css';

const initialAmbulances = [
  { 
    id: 1, 
    number: "AMB-001", 
    status: "Available", 
    driver: "Rajesh Kumar", 
    contact: "9876543210",
    location: "Hospital Garage",
    destination: "",
    isEditing: false,
    lastUpdated: new Date().toISOString()
  }
];

const AmbulanceServices = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [ambulances, setAmbulances] = useState(() => {
    const saved = localStorage.getItem('ambulances');
    return saved ? JSON.parse(saved) : initialAmbulances;
  });
  const [editData, setEditData] = useState({ status: "", location: "", destination: "" });
  const [newAmbulance, setNewAmbulance] = useState({
    number: "",
    driver: "",
    contact: "",
    status: "Available",
    location: "Hospital Garage"
  });

  useEffect(() => {
    localStorage.setItem('ambulances', JSON.stringify(ambulances));
  }, [ambulances]);

  const handleEditToggle = (ambulance) => {
    setAmbulances(prev => 
      prev.map(amb => 
        amb.id === ambulance.id 
          ? { ...amb, isEditing: !amb.isEditing } 
          : { ...amb, isEditing: false }
      )
    );
    setEditData({
      status: ambulance.status,
      location: ambulance.location,
      destination: ambulance.destination
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (id) => {
    setAmbulances(prev =>
      prev.map(amb =>
        amb.id === id ? { 
          ...amb, 
          ...editData,
          isEditing: false,
          lastUpdated: new Date().toISOString()
        } : amb
      )
    );
  };

  const handleAddAmbulance = () => {
    if (!newAmbulance.number || !newAmbulance.driver || !newAmbulance.contact) {
      alert("Please fill all required fields");
      return;
    }

    const newId = ambulances.length > 0 ? Math.max(...ambulances.map(a => a.id)) + 1 : 1;
    
    setAmbulances(prev => [
      ...prev,
      {
        id: newId,
        ...newAmbulance,
        destination: "",
        isEditing: false,
        lastUpdated: new Date().toISOString()
      }
    ]);

    setNewAmbulance({
      number: "",
      driver: "",
      contact: "",
      status: "Available",
      location: "Hospital Garage"
    });
  };

  return (
    <div className="ambulance-container">
      <div className="ambulance-header">
        <h1>Ambulance Services</h1>
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>

      {isAdmin && (
        <div className="add-ambulance-form">
          <h3>Add New Ambulance</h3>
          <div className="form-row">
            <input
              type="text"
              name="number"
              value={newAmbulance.number}
              onChange={(e) => setNewAmbulance(prev => ({ ...prev, number: e.target.value }))}
              placeholder="Ambulance Number"
              required
            />
            <input
              type="text"
              name="driver"
              value={newAmbulance.driver}
              onChange={(e) => setNewAmbulance(prev => ({ ...prev, driver: e.target.value }))}
              placeholder="Driver Name"
              required
            />
            <input
              type="tel"
              name="contact"
              value={newAmbulance.contact}
              onChange={(e) => setNewAmbulance(prev => ({ ...prev, contact: e.target.value }))}
              placeholder="Contact Number"
              required
            />
          </div>
          <button className="add-button" onClick={handleAddAmbulance}>
            + Add Ambulance
          </button>
        </div>
      )}

      <div className="ambulance-list">
        {ambulances.map(ambulance => (
          <div key={ambulance.id} className={`ambulance-card ${ambulance.status.toLowerCase().replace(' ', '-')}`}>
            <div className="ambulance-header-row">
              <h3>{ambulance.number}</h3>
              {isAdmin && (
                <div className="ambulance-actions">
                  {!ambulance.isEditing ? (
                    <>
                      <button className="edit-button" onClick={() => handleEditToggle(ambulance)}>
                        ✏️ Edit
                      </button>
                      <button 
                        className="remove-button" 
                        onClick={() => setAmbulances(prev => prev.filter(a => a.id !== ambulance.id))}
                      >
                        🗑️ Remove
                      </button>
                    </>
                  ) : null}
                </div>
              )}
            </div>

            <div className="ambulance-details">
              {ambulance.isEditing ? (
                <>
                  <div className="edit-field">
                    <label>Status:</label>
                    <select
                      name="status"
                      value={editData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Available">Available</option>
                      <option value="On Duty">On Duty</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div className="edit-field">
                    <label>Location:</label>
                    <input
                      type="text"
                      name="location"
                      value={editData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="edit-field">
                    <label>Destination:</label>
                    <input
                      type="text"
                      name="destination"
                      value={editData.destination}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p><strong>Driver:</strong> {ambulance.driver}</p>
                  <p><strong>Contact:</strong> {ambulance.contact}</p>
                  <p>
                    <strong>Status:</strong> 
                    <span className={`status-badge ${ambulance.status.toLowerCase().replace(' ', '-')}`}>
                      {ambulance.status}
                    </span>
                  </p>
                  <p><strong>Location:</strong> {ambulance.location}</p>
                  {ambulance.destination && <p><strong>Destination:</strong> {ambulance.destination}</p>}
                  <p className="last-updated">
                    <small>Last updated: {new Date(ambulance.lastUpdated).toLocaleString()}</small>
                  </p>
                </>
              )}
            </div>

            {ambulance.isEditing && (
              <div className="edit-actions">
                <button className="save-button" onClick={() => handleSave(ambulance.id)}>
                  💾 Save
                </button>
                <button className="cancel-button" onClick={() => handleEditToggle(ambulance)}>
                  ❌ Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmbulanceServices;