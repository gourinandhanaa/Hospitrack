import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PageTemplate.css";

const RoomsAndBeds = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(() => {
    const savedData = localStorage.getItem("roomsData");
    return savedData ? JSON.parse(savedData) : [
      { id: 1, type: "General Ward", total: 57, occupied: 40, available: 17 },
      { id: 2, type: "ICU", total: 10, occupied: 8, available: 2 },
      { id: 3, type: "Private Room", total: 15, occupied: 10, available: 5 },
      { id: 4, type: "Semi-Private", total: 12, occupied: 7, available: 5 },
    ];
  });
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [formData, setFormData] = useState({ total: "", occupied: "" });
  const pollingRef = useRef(null);

  // Save to localStorage whenever rooms change
  useEffect(() => {
    localStorage.setItem("roomsData", JSON.stringify(rooms));
  }, [rooms]);

  const fetchRoomData = async () => {
    try {
      const response = await fetch("/api/beds");
      if (response.ok) {
        const bedsData = await response.json();
        setRooms(bedsData);
      }
    } catch (error) {
      console.log("Using locally stored data");
    }
  };

  useEffect(() => {
    fetchRoomData();
    pollingRef.current = setInterval(fetchRoomData, 5000);
    return () => clearInterval(pollingRef.current);
  }, []);

  const handleEditClick = (room) => {
    setEditingRoomId(room.id);
    setFormData({ total: room.total, occupied: room.occupied });
  };

  const handleSave = async () => {
    const newTotal = parseInt(formData.total);
    const newOccupied = parseInt(formData.occupied);

    if (newOccupied > newTotal) {
      alert("Occupied beds cannot exceed total beds!");
      return;
    }

    try {
      await fetch(`/api/beds/${editingRoomId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total: newTotal,
          occupied: newOccupied
        })
      });
    } catch (error) {
      console.log("Saving to local storage");
    }

    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === editingRoomId ? {
          ...room,
          total: newTotal,
          occupied: newOccupied,
          available: newTotal - newOccupied
        } : room
      )
    );
    setEditingRoomId(null);
  };

  const handleCancel = () => {
    setEditingRoomId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalBeds = rooms.reduce((sum, room) => sum + room.total, 0);
  const occupiedBeds = rooms.reduce((sum, room) => sum + room.occupied, 0);
  const availableBeds = rooms.reduce((sum, room) => sum + room.available, 0);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Rooms & Beds Management</h1>
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>

      <div className="summary-section">
        <div className="summary-card">
          <h3>Total Beds</h3>
          <p>{totalBeds}</p>
        </div>
        <div className="summary-card">
          <h3>Occupied Beds</h3>
          <p>{occupiedBeds}</p>
        </div>
        <div className="summary-card">
          <h3>Available Beds</h3>
          <p>{availableBeds}</p>
        </div>
      </div>

      <div className="content-box">
        <div className="rooms-grid">
          {rooms.map((room) => (
            <div key={room.id} className="room-card">
              <h3>{room.type}</h3>
              {editingRoomId === room.id ? (
                <div className="room-edit-form">
                  <div className="form-group">
                    <label>Total Beds:</label>
                    <input
                      type="number"
                      name="total"
                      min="1"
                      value={formData.total}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Occupied Beds:</label>
                    <input
                      type="number"
                      name="occupied"
                      min="0"
                      max={formData.total}
                      value={formData.occupied}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Available Beds:</label>
                    <input
                      type="number"
                      value={formData.total - formData.occupied}
                      disabled
                    />
                  </div>
                  <div className="button-group">
                    <button className="save-btn" onClick={handleSave}>
                      Save Changes
                    </button>
                    <button className="cancel-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="room-stats">
                    <div className="stat-item">
                      <span className="stat-label">Total:</span>
                      <span className="stat-value">{room.total}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Occupied:</span>
                      <span className="stat-value">{room.occupied}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Available:</span>
                      <span className="stat-value">{room.available}</span>
                    </div>
                  </div>
                  {isAdmin && (
                    <button className="edit-btn" onClick={() => handleEditClick(room)}>
                      Edit
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomsAndBeds;