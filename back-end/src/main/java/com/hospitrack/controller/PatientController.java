package com.hospitrack.controller;

import com.hospitrack.model.Patients;
import com.hospitrack.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:3000")  // Enable CORS for the frontend (React)
public class PatientController {

    @Autowired
    private PatientService patientService;

    // Get all patients
    @GetMapping
    public List<Patients> getAllPatients() {
        return patientService.getAllPatients();
    }

    // Add a new patient
    @PostMapping
    public Patients addPatient(@RequestBody Patients patient) {
        return patientService.addPatient(patient);
    }

    // Get a specific patient by ID
    @GetMapping("/{id}")
    public Patients getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    // Update a patient's information
    @PutMapping("/{id}")
    public Patients updatePatient(@PathVariable Long id, @RequestBody Patients updatedPatient) {
        return patientService.updatePatient(id, updatedPatient);
    }

    // Delete a patient by ID
    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
    }
}
