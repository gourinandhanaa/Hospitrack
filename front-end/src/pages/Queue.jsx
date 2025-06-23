import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./PageTemplate.css";
import "./Queue.css";

const Queue = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    tokenNumber: "",
    status: "WAITING",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const patientsDataRef = useRef([]);
  const pollingRef = useRef(null);

  useEffect(() => {
    fetchPatients(); // Fetch data when component mounts
    pollingRef.current = setInterval(fetchPatients, 5000); // Poll every 5 seconds

    return () => {
      clearInterval(pollingRef.current); // Cleanup polling on component unmount
    };
  }, []);

  useEffect(() => {
    patientsDataRef.current = patients; // Keep a reference of the patients for error recovery
  }, [patients]);

  const fetchPatients = async () => {
    try {
      setIsLoading(true); // Set loading to true when fetching
      const response = await api.get("/queue");
      setPatients(response.data); // Update the state with the patients data
      setError(null);
    } catch (error) {
      console.error("Failed to fetch queue", error);
      setError("Failed to load patients. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  const validatePatient = () => {
    if (!newPatient.name.trim()) {
      setError("Patient name is required");
      return false;
    }
    if (!newPatient.tokenNumber.trim()) {
      setError("Token number is required");
      return false;
    }
    if (isNaN(newPatient.tokenNumber)) {
      setError("Token number must be a number");
      return false;
    }
    if (patients.some(p => p.tokenNumber === parseInt(newPatient.tokenNumber))) {
      setError("Token number already exists");
      return false;
    }
    return true;
  };

  const addNewPatient = async () => {
    if (!validatePatient()) return;

    setIsLoading(true);
    try {
      const patientData = {
        name: newPatient.name.trim(),
        tokenNumber: parseInt(newPatient.tokenNumber, 10),
        status: newPatient.status === "IN CONSULTATION" ? "IN_CONSULTATION" : newPatient.status,
      };

      const response = await api.post("/queue", patientData);
      setPatients((prev) => [...prev, response.data]); // Add the new patient to the queue

      setNewPatient({ name: "", tokenNumber: "", status: "WAITING" });
      setError(null);
    } catch (error) {
      console.error("Failed to add patient:", error);
      handleAddPatientError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPatientError = (error) => {
    let errorMessage = "Failed to add patient. Please try again.";
    
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = "Invalid data. Please check all fields.";
          break;
        case 409:
          errorMessage = "Token number already exists.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          if (error.response.data?.message) {
            errorMessage = error.response.data.message;
          }
      }
    } else if (error.message === "Network Error") {
      errorMessage = "Cannot connect to server. Check your connection.";
    }
    
    setError(errorMessage);
  };

  const handleStatusChange = async (id, value) => {
    if (!isAdmin) return;

    try {
      await api.put(`/queue/${id}/status`, null, {
        params: { status: value === "IN CONSULTATION" ? "IN_CONSULTATION" : value },
      });
      setError(null);
    } catch (error) {
      console.error("Failed to update patient", error);
      setError("Failed to update status. Please try again.");
      setPatients((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                status:
                  patientsDataRef.current.find((patient) => patient.id === id)?.status || p.status,
              }
            : p
        )
      );
    }
  };

  const removePatient = async (id) => {
    if (!isAdmin) return;

    try {
      await api.delete(`/queue/${id}`);
      setError(null);
    } catch (error) {
      console.error("Failed to remove patient", error);
      setError("Failed to remove patient. Please try again.");
      const patientToRestore = patientsDataRef.current.find((p) => p.id === id);
      if (patientToRestore) {
        setPatients((prev) => [...prev, patientToRestore]);
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Patient Queue</h1>
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>

      <div className="content-box">
        {error && <div className="error-message">{error}</div>}

        {isAdmin && (
          <div className="add-patient-form">
            <h3>Add New Patient</h3>
            <div className="form-row">
              <input
                type="text"
                placeholder="Full Name"
                value={newPatient.name}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, name: e.target.value })
                }
                disabled={isLoading}
              />
              <input
                type="text"
                placeholder="Token Number"
                value={newPatient.tokenNumber}
                onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    tokenNumber: e.target.value.replace(/\D/g, ""),
                  })
                }
                disabled={isLoading}
              />
              <select
                value={newPatient.status}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, status: e.target.value })
                }
                disabled={isLoading}
              >
                <option value="WAITING">Waiting</option>
                <option value="IN CONSULTATION">In Consultation</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELED">Canceled</option>
              </select>
              <button 
                onClick={addNewPatient} 
                className="add-button"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        )}

        <div className="queue-header-row">
          <span>Token</span>
          {isAdmin && <span>Full Details</span>}
          <span>Status</span>
          {isAdmin && <span>Actions</span>}
        </div>

        {isLoading && patients.length === 0 ? (
          <div className="loading-indicator">Loading patients...</div>
        ) : (
          <div className="queue-list">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className={`queue-item ${patient.status
                  .toLowerCase()
                  .replace("_", "-")}`}
              >
                <span className="token">{patient.tokenNumber}</span>

                {isAdmin && (
                  <div className="patient-details">
                    <span className="name">{patient.name}</span>
                  </div>
                )}

                {isAdmin ? (
                  <select
                    className={`status ${patient.status
                      .toLowerCase()
                      .replace("_", "-")}`}
                    value={patient.status}
                    onChange={(e) =>
                      handleStatusChange(patient.id, e.target.value)
                    }
                    disabled={isLoading}
                  >
                    <option value="WAITING">Waiting</option>
                    <option value="IN_CONSULTATION">In Consultation</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELED">Canceled</option>
                  </select>
                ) : (
                  <span
                    className={`status ${patient.status
                      .toLowerCase()
                      .replace("_", "-")}`}
                  >
                    {patient.status.replace("_", " ")}
                  </span>
                )}

                {isAdmin && (
                  <div className="actions">
                    <button
                      onClick={() => removePatient(patient.id)}
                      className="remove-button"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Remove"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Queue;
