package com.hospitrack.repository;

import com.hospitrack.model.CriticalAlert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CriticalAlertRepository extends JpaRepository<CriticalAlert, Long> {
}
