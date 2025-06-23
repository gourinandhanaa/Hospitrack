package com.hospitrack.service;

import com.hospitrack.model.Bed;
import com.hospitrack.repository.BedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BedService {

    @Autowired
    private BedRepository bedRepository;

    // Fetch all beds
    public List<Bed> getAllBeds() {
        return bedRepository.findAll();
    }

    // Fetch a specific bed by its ID
    public Optional<Bed> getBedById(Long id) {
        return bedRepository.findById(id);
    }

    // Add or update a bed
    public Bed saveBed(Bed bed) {
        return bedRepository.save(bed);
    }

    // Delete a bed by ID
    public void deleteBed(Long id) {
        if (bedRepository.existsById(id)) {
            bedRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Bed not found with ID: " + id);
        }
    }

    // Update all bed data periodically (for polling)
    public List<Bed> updateBedData() {
        return bedRepository.findAll();  // This can be used for polling
    }

    // Fetch beds by availability
    public List<Bed> getBedsByAvailability(boolean available) {
        return bedRepository.findByAvailable(available);
    }

    // Fetch beds by room type
    public List<Bed> getBedsByRoomType(String roomType) {
        return bedRepository.findByRoomType(roomType);
    }
}
