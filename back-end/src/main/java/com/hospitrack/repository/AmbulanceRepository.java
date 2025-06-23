package com.hospitrack.repository;

import com.hospitrack.model.Ambulance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AmbulanceRepository extends JpaRepository<Ambulance, Long> {
}
