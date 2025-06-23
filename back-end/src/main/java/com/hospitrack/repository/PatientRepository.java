package com.hospitrack.repository;

import com.hospitrack.model.Patients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patients, Long> {
}
