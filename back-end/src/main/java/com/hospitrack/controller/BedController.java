package com.hospitrack.controller;

import com.hospitrack.model.Bed;
import com.hospitrack.service.BedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/beds")
public class BedController {

    @Autowired
    private BedService bedService;

    // ✅ GET /api/beds - Fetch all beds
    @GetMapping
    public ResponseEntity<List<Bed>> getAllBeds() {
        List<Bed> beds = bedService.getAllBeds();
        return ResponseEntity.ok(beds);
    }

    // ✅ GET /api/beds/{id} - Get a specific bed by ID
    @GetMapping("/{id}")
    public ResponseEntity<Bed> getBedById(@PathVariable Long id) {
        Optional<Bed> bed = bedService.getBedById(id);
        return bed.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ PUT /api/beds/{id} - Update a bed by ID
    @PutMapping("/{id}")
    public ResponseEntity<Bed> updateBed(@PathVariable Long id, @RequestBody Bed updatedBed) {
        Optional<Bed> optionalBed = bedService.getBedById(id);

        if (optionalBed.isPresent()) {
            Bed existingBed = optionalBed.get();
            existingBed.setRoomType(updatedBed.getRoomType());
            existingBed.setAvailable(updatedBed.isAvailable());
            Bed savedBed = bedService.saveBed(existingBed);
            return ResponseEntity.ok(savedBed);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ POST /api/beds - Create a new bed
    @PostMapping
    public ResponseEntity<Bed> createBed(@RequestBody Bed bed) {
        Bed createdBed = bedService.saveBed(bed);
        return ResponseEntity.ok(createdBed);
    }

    // ✅ DELETE /api/beds/{id} - Delete a bed by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBed(@PathVariable Long id) {
        if (bedService.getBedById(id).isPresent()) {
            bedService.deleteBed(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

