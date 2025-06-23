// src/components/Patients.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients, addPatient } from "../api/patientService";
import "./PageTemplate.css";

const Patients = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    condition: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPatients = async () => {
    setLoading(true);
    try {
      const response = await getPatients();
      setPatients(response.data);
      setError("");
    } catch {
      setError("Failed to load patients. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddPatient = async () => {
    if (!formData.name || !formData.age || !formData.gender || !formData.condition) {
      alert("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await addPatient({
        name: formData.name,
        age: parseInt(formData.age, 10),
        gender: formData.gender,
        condition: formData.condition
      });
      await loadPatients();
      setFormData({ name: "", age: "", gender: "", condition: "" });
      setShowForm(false);
      setError("");
    } catch {
      setError("Failed to add patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = (id) => {
    // if you want delete via service, add deletePatient to service
    const updated = patients.filter(p => p.id !== id);
    localStorage.setItem("patients", JSON.stringify(updated));
    setPatients(updated);
    alert("Patient deleted successfully");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Patient Records</h1>
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <h2>Total Patients: {patients.length}</h2>

      <div className="data-grid">
        {patients.map(patient => (
          <div key={patient.id} className="patient-card">
            <div className="card-header">
              <h3>{patient.name}</h3>
              {isAdmin && (
                <button
                  className="delete-button"
                  onClick={() => window.confirm("Delete this patient?") && handleDeletePatient(patient.id)}
                >
                  ×
                </button>
              )}
            </div>
            <div className="card-body">
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Gender:</strong> {patient.gender}</p>
              <p><strong>Condition:</strong> {patient.condition}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="status-badge">{patient.status}</span>
              </p>
            </div>
          </div>
        ))}

        {isAdmin && (
          <div className="form-container">
            {!showForm ? (
              <button
                className="admin-action-button"
                onClick={() => setShowForm(true)}
              >
                Add New Patient Record
              </button>
            ) : (
              <div className="patient-form">
                <h3>New Patient Form</h3>
                <input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  name="age"
                  type="number"
                  placeholder="Age"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  name="condition"
                  placeholder="Medical Condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                />
                <div className="form-actions">
                  <button
                    className="confirm-button"
                    onClick={handleAddPatient}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Patient"}
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
