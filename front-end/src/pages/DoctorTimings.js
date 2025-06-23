import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PageTemplate.css";

const DoctorTimings = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem("doctors");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Dr. Sharma",
            specialty: "Cardiology",
            timings: "9:00 AM - 2:00 PM",
            days: "Mon, Wed, Fri",
          },
          {
            id: 2,
            name: "Dr. Patel",
            specialty: "Neurology",
            timings: "10:00 AM - 4:00 PM",
            days: "Tue, Thu, Sat",
          },
          {
            id: 3,
            name: "Dr. Gupta",
            specialty: "Pediatrics",
            timings: "8:00 AM - 1:00 PM",
            days: "Mon-Fri",
          },
          {
            id: 4,
            name: "Dr. Reddy",
            specialty: "Orthopedics",
            timings: "11:00 AM - 5:00 PM",
            days: "Mon, Tue, Thu, Fri",
          },
          {
            id: 5,
            name: "Dr. Khan",
            specialty: "Dermatology",
            timings: "9:30 AM - 3:30 PM",
            days: "Wed, Thu, Sat",
          },
        ];
  });

  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    timings: "",
    days: "",
  });

  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  const handleEdit = (doctor) => {
    setEditingId(doctor.id);
    setFormData(doctor);
  };

  const handleSave = () => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === editingId ? { ...doc, ...formData } : doc))
    );
    setEditingId(null);
  };

  const handleAddDoctor = () => {
    const newDoctor = {
      id: doctors.length > 0 ? Math.max(...doctors.map((d) => d.id)) + 1 : 1,
      ...formData,
    };
    setDoctors((prev) => [...prev, newDoctor]);
    setShowAddForm(false);
    setFormData({ name: "", specialty: "", timings: "", days: "" });
  };

  const handleRemove = (id) => {
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAppointment = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Doctor Timings</h1>
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>

      <div className="content-box">
        {isAdmin && (
          <div className="add-doctor-section">
            <button
              className="admin-action-button"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? "Cancel Add Doctor" : "+ Add New Doctor"}
            </button>

            {showAddForm && (
              <div className="add-doctor-form">
                <h3>Add New Doctor</h3>
                <input
                  name="name"
                  placeholder="Doctor Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  name="specialty"
                  placeholder="Specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                />
                <input
                  name="timings"
                  placeholder="Timings"
                  value={formData.timings}
                  onChange={handleChange}
                />
                <input
                  name="days"
                  placeholder="Working Days"
                  value={formData.days}
                  onChange={handleChange}
                />
                <div className="button-group">
                  <button onClick={handleAddDoctor}>Add Doctor</button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="doctors-list">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="specialty">{doctor.specialty}</p>
              </div>

              {editingId === doctor.id ? (
                <div className="edit-form">
                  <input
                    name="name"
                    placeholder="Doctor Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <input
                    name="specialty"
                    placeholder="Specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                  />
                  <input
                    name="timings"
                    placeholder="Timings"
                    value={formData.timings}
                    onChange={handleChange}
                  />
                  <input
                    name="days"
                    placeholder="Working Days"
                    value={formData.days}
                    onChange={handleChange}
                  />
                  <div className="button-group">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="timing-info">
                    <p>
                      <strong>Timings:</strong> {doctor.timings}
                    </p>
                    <p>
                      <strong>Days:</strong> {doctor.days}
                    </p>
                  </div>
                  <div className="doctor-actions">
                    {!isAdmin && (
                      <button
                        className="appointment-button"
                        onClick={() => handleAppointment(doctor.id)}
                      >
                        Make Appointment
                      </button>
                    )}
                    {isAdmin && (
                      <>
                        <button
                          className="admin-action-button"
                          onClick={() => handleEdit(doctor)}
                        >
                          Edit Schedule
                        </button>
                        <button
                          className="admin-action-button"
                          onClick={() => handleRemove(doctor.id)}
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorTimings;
