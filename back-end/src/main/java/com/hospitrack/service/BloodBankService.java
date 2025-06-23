package com.hospitrack.service;

import com.hospitrack.model.BloodUnit;
import com.hospitrack.repository.BloodBankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BloodBankService {

    @Autowired
    private BloodBankRepository bloodBankRepository;

    public List<BloodUnit> getAllUnits() {
        return bloodBankRepository.findAll();
    }

    public Long getTotalUnitsAvailable() {
        Long total = bloodBankRepository.sumTotalUnits();
        return total != null ? total : 0L;
    }

    public BloodUnit addBloodUnit(BloodUnit unit) {
        return bloodBankRepository.save(unit);
    }
}
