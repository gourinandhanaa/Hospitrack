package com.hospitrack.controller;

import com.hospitrack.model.CriticalAlert;
import com.hospitrack.repository.CriticalAlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class CriticalAlertController {

    @Autowired
    private CriticalAlertRepository criticalAlertRepository;

    @GetMapping
    public List<CriticalAlert> getAllAlerts() {
        return criticalAlertRepository.findAll();
    }

    @PostMapping
    public CriticalAlert addAlert(@RequestBody CriticalAlert alert) {
        return criticalAlertRepository.save(alert);
    }
}
