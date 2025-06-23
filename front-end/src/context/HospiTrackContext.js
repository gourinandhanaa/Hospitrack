// src/context/HospiTrackContext.js
import React, { createContext, useContext, useState } from 'react';

const HospiTrackContext = createContext();

export const useHospiTrack = () => useContext(HospiTrackContext);

export const HospiTrackProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'Cardiac Arrest', patient: 'Aman Gupta', time: '10:30 AM', status: 'active' }
  ]);

  const [patients, setPatients] = useState([
    { id: 1, name: "Riya Mehra", age: 35, gender: "Female", condition: "Fever" },
    { id: 2, name: "Arjun Verma", age: 42, gender: "Male", condition: "Back Pain" }
  ]);

  const [queue, setQueue] = useState([
    { 
      id: 1,
      token: 1001,
      name: "John Doe",
      age: 35,
      gender: "Male",
      contact: "9876543210",
      status: "Waiting",
      priority: "Normal",
      doctor: "Dr. Smith"
    }
  ]);

  const addPatient = (patient) => {
    setPatients(prev => [...prev, { id: Date.now(), ...patient }]);
  };

  const addToQueue = (patient) => {
    const newToken = queue.length > 0 
      ? Math.max(...queue.map(p => p.token)) + 1 
      : 1001;
    setQueue(prev => [...prev, { id: Date.now(), token: newToken, status: 'Waiting', ...patient }]);
  };

  const updateQueueStatus = (id, status) => {
    setQueue(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const removeFromQueue = (id) => {
    setQueue(prev => prev.filter(p => p.id !== id));
  };

  const resolveAlert = (id) => {
    setAlerts(prev => prev.map(alert => alert.id === id ? { ...alert, status: 'resolved' } : alert));
  };

  return (
    <HospiTrackContext.Provider value={{
      alerts, setAlerts, resolveAlert,
      patients, setPatients, addPatient,
      queue, setQueue, addToQueue, updateQueueStatus, removeFromQueue
    }}>
      {children}
    </HospiTrackContext.Provider>
  );
};
