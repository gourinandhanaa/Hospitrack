package com.hospitrack.controller;

import com.hospitrack.model.DashboardStats;
import com.hospitrack.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000") // Make sure this matches frontend port
public class DashboardController {

    private final DashboardService dashboardService;

    @Autowired
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        try {
            DashboardStats stats = dashboardService.getStats();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            e.printStackTrace(); // Optional: log exception
            return ResponseEntity.internalServerError().build();
        }
    }
}
