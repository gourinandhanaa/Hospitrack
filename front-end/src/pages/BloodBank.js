import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BloodBank.css";

// Initial blood stock data
const initialBloodStock = [
  { type: "A+", units: 15, critical: 5 },
  { type: "A-", units: 8, critical: 5 },
  { type: "B+", units: 12, critical: 5 },
  { type: "B-", units: 6, critical: 5 },
  { type: "AB+", units: 4, critical: 3 },
  { type: "AB-", units: 2, critical: 2 },
  { type: "O+", units: 20, critical: 8 },
  { type: "O-", units: 10, critical: 5 }
];

const BloodBank = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [bloodStock, setBloodStock] = useState(() => {
    const saved = localStorage.getItem("bloodStock");
    return saved ? JSON.parse(saved) : initialBloodStock;
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [newUnits, setNewUnits] = useState("");

  // Persist to localStorage and sync across tabs
  useEffect(() => {
    localStorage.setItem("bloodStock", JSON.stringify(bloodStock));
  }, [bloodStock]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "bloodStock") {
        setBloodStock(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewUnits(bloodStock[index].units);
  };

  const handleSave = () => {
    const updatedStock = bloodStock.map((blood, idx) => 
      idx === editingIndex ? { ...blood, units: parseInt(newUnits) } : blood
    );
    setBloodStock(updatedStock);
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  return (
    <div className="bloodbank-container">
      <div className="bloodbank-header">
        <h1>Blood Bank</h1>
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="blood-stock">
        {bloodStock.map((blood, index) => (
          <div
            key={index}
            className={`blood-type ${blood.units <= blood.critical ? "critical" : ""}`}
          >
            <h3>{blood.type}</h3>
            {editingIndex === index ? (
              <>
                <input
                  type="number"
                  value={newUnits}
                  onChange={(e) => setNewUnits(e.target.value)}
                  min="0"
                />
                <div className="button-group">
                  <button className="save-btn" onClick={handleSave}>
                    💾 Save
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    ❌ Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>{blood.units} Units</p>
                {blood.units <= blood.critical && (
                  <span className="warning">⚠️ Critical Level!</span>
                )}
                {isAdmin && (
                  <button 
                    className="order-button"
                    onClick={() => handleEdit(index)}
                  >
                    ✏️ Update Stock
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodBank;