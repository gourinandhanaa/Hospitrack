// src/api/patientService.js

/**
 * A simple patient service using browser localStorage as the data store.
 * Each function returns a Promise resolving to an object with a `data` property,
 * mimicking an HTTP response.
 */

/**
 * Retrieve all patients from localStorage.
 * @returns {Promise<{ data: Patients[] }>}
 */
export const getPatients = async () => {
    try {
      const patients = JSON.parse(localStorage.getItem('patients')) || [];
      return Promise.resolve({ data: patients });
    } catch (error) {
      return Promise.reject(new Error('Failed to load patients'));
    }
  };
  
  /**
   * Retrieve a single patient by ID.
   * @param {number} id — The ID of the patient.
   * @returns {Promise<{ data: Patients }>}
   */
  export const getPatientById = async (id) => {
    try {
      const patients = JSON.parse(localStorage.getItem('patients')) || [];
      const patient = patients.find(p => p.id === id);
      if (!patient) throw new Error('Patient not found');
      return Promise.resolve({ data: patient });
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  /**
   * Add a new patient to localStorage.
   * @param {Partial<Patients>} patient — The patient object to add.
   * @returns {Promise<{ data: Patients }>}
   */
  export const addPatient = async (patient) => {
    try {
      const existing = JSON.parse(localStorage.getItem('patients')) || [];
      const newPatient = {
        ...patient,
        id: existing.length > 0 ? Math.max(...existing.map(p => p.id)) + 1 : 1,
        admissionDate: new Date().toISOString(),
        contact: patient.contact || 'N/A',
        priority: patient.priority || 'Normal',
        doctor: patient.doctor || 'N/A',
        status: patient.status || 'WAITING',
        tokenNumber: existing.length + 1001
      };
      const updated = [...existing, newPatient];
      localStorage.setItem('patients', JSON.stringify(updated));
      return Promise.resolve({ data: newPatient });
    } catch (error) {
      return Promise.reject(new Error('Failed to add patient'));
    }
  };
  
  /**
   * Update an existing patient by ID.
   * @param {number} id — The ID of the patient to update.
   * @param {Partial<Patients>} updates — The updated fields.
   * @returns {Promise<{ data: Patients }>}
   */
  export const updatePatient = async (id, updates) => {
    try {
      const existing = JSON.parse(localStorage.getItem('patients')) || [];
      let updatedPatient;
      const updatedList = existing.map(p => {
        if (p.id === id) {
          updatedPatient = { ...p, ...updates };
          return updatedPatient;
        }
        return p;
      });
      if (!updatedPatient) throw new Error('Patient not found');
      localStorage.setItem('patients', JSON.stringify(updatedList));
      return Promise.resolve({ data: updatedPatient });
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  /**
   * Delete a patient by ID.
   * @param {number} id — The ID of the patient to delete.
   * @returns {Promise<void>}
   */
  export const deletePatient = async (id) => {
    try {
      const existing = JSON.parse(localStorage.getItem('patients')) || [];
      const updated = existing.filter(p => p.id !== id);
      localStorage.setItem('patients', JSON.stringify(updated));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error('Failed to delete patient'));
    }
  };
  