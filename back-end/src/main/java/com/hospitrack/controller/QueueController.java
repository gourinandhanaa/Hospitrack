package com.hospitrack.controller;

import com.hospitrack.model.QueueEntry;
import com.hospitrack.service.QueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/queue")
public class QueueController {

    private final QueueService queueService;

    @Autowired
    public QueueController(QueueService queueService) {
        this.queueService = queueService;
    }

    // REST API Endpoints

    @GetMapping
    public ResponseEntity<List<QueueEntry>> getAllQueueEntries() {
        // Fetch all the entries from the service and return them as a list
        List<QueueEntry> queueEntries = queueService.getAllQueueEntries();
        return ResponseEntity.ok(queueEntries);
    }

    @PostMapping
    public ResponseEntity<QueueEntry> addPatient(@RequestBody QueueEntry entry) {
        // Add a new patient entry to the queue and return the updated entry
        QueueEntry savedEntry = queueService.addPatient(entry);
        return ResponseEntity.ok(savedEntry);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QueueEntry> updatePatient(@PathVariable Long id, @RequestBody QueueEntry entry) {
        // Update an existing patient entry in the queue and return the updated entry
        QueueEntry updatedEntry = queueService.updatePatient(id, entry);
        return ResponseEntity.ok(updatedEntry);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<QueueEntry> updateStatus(@PathVariable Long id, @RequestParam QueueEntry.Status status) {
        // Update the status of a patient entry and return the updated entry
        QueueEntry updatedEntry = queueService.updateStatus(id, status);
        return ResponseEntity.ok(updatedEntry);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removePatient(@PathVariable Long id) {
        // Remove a patient entry from the queue
        queueService.removePatient(id);
        return ResponseEntity.noContent().build();
    }
}
