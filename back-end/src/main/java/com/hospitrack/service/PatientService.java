package com.hospitrack.service;

import com.hospitrack.model.Patients;

import java.util.List;

public interface PatientService {

    List<Patients> getAllPatients();

    Patients savePatient(Patients patient);

    Patients getPatientById(Long id);

    Patients addPatient(Patients patient);

    Patients updatePatient(Long id, Patients patientUpdate);

    void deletePatient(Long id);
}

