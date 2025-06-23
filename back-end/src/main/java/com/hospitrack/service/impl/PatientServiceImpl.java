package com.hospitrack.service.impl;

import com.hospitrack.model.Patients;
import com.hospitrack.repository.PatientRepository;
import com.hospitrack.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public List<Patients> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patients savePatient(Patients patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Patients getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + id));
    }

    @Override
    public Patients addPatient(Patients patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Patients updatePatient(Long id, Patients patientUpdate) {
        Patients existingPatient = getPatientById(id);
        existingPatient.setName(patientUpdate.getName());
        existingPatient.setAge(patientUpdate.getAge());
        existingPatient.setGender(patientUpdate.getGender());
        existingPatient.setContact(patientUpdate.getContact());
        existingPatient.setPriority(patientUpdate.getPriority());
        existingPatient.setDoctor(patientUpdate.getDoctor());
        existingPatient.setStatus(patientUpdate.getStatus());
        existingPatient.setTokenNumber(patientUpdate.getTokenNumber());
        return patientRepository.save(existingPatient);
    }

    @Override
    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete. Patient not found with ID: " + id);
        }
        patientRepository.deleteById(id);
    }
}
