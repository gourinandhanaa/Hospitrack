package com.hospitrack.controller;

import com.hospitrack.model.Ambulance;
import com.hospitrack.repository.AmbulanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ambulances")
public class AmbulanceController {

    @Autowired
    private AmbulanceRepository ambulanceRepository;

    @GetMapping
    public List<Ambulance> getAllAmbulances() {
        return ambulanceRepository.findAll();
    }

    @PostMapping
    public Ambulance addAmbulance(@RequestBody Ambulance ambulance) {
        return ambulanceRepository.save(ambulance);
    }
}
