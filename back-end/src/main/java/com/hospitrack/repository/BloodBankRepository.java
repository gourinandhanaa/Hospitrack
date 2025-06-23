package com.hospitrack.repository;

import com.hospitrack.model.BloodUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BloodBankRepository extends JpaRepository<BloodUnit, Long> {

    @Query(value = "SELECT SUM(units_available) FROM blood_unit", nativeQuery = true)
    Long sumTotalUnits();
}
