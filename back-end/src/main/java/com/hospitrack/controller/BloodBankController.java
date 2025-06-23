package com.hospitrack.controller;

import com.hospitrack.model.BloodUnit;
import com.hospitrack.repository.BloodBankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bloodbank")
public class BloodBankController {

    @Autowired
    private BloodBankRepository bloodBankRepository;

    // Get all blood units
    @GetMapping
    public List<BloodUnit> getAllBloodUnits() {
        return bloodBankRepository.findAll();
    }

    // Add a new blood unit
    @PostMapping
    public BloodUnit addBloodUnit(@RequestBody BloodUnit bloodUnit) {
        return bloodBankRepository.save(bloodUnit);
    }

    // Get total units available (sum)
    @GetMapping("/total")
    public Long getTotalUnitsAvailable() {
        Long total = bloodBankRepository.sumTotalUnits();
        return total != null ? total : 0L;
    }
}
