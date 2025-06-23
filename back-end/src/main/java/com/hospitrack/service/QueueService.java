package com.hospitrack.service;

import com.hospitrack.model.QueueEntry;
import com.hospitrack.repository.QueueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class QueueService {

    @Autowired
    private QueueRepository queueRepository;

    // Fetch all queue entries
    public List<QueueEntry> getAllQueueEntries() {
        return queueRepository.findAll();
    }

    // Add a patient to the queue
    @Transactional
    public QueueEntry addPatient(QueueEntry entry) {
        return queueRepository.save(entry);
    }

    // Update patient details in the queue
    @Transactional
    public QueueEntry updatePatient(Long id, QueueEntry entry) {
        return queueRepository.findById(id)
                .map(existing -> {
                    existing.setName(entry.getName());
                    existing.setTokenNumber(entry.getTokenNumber());
                    existing.setStatus(entry.getStatus());
                    return queueRepository.save(existing);
                })
                .orElse(null);
    }

    // Remove a patient from the queue
    @Transactional
    public void removePatient(Long id) {
        queueRepository.findById(id).ifPresent(entry -> {
            queueRepository.deleteById(id);
        });
    }

    // Update the status of a patient in the queue
    @Transactional
    public QueueEntry updateStatus(Long id, QueueEntry.Status status) {
        return queueRepository.findById(id)
                .map(entry -> {
                    entry.setStatus(status);
                    return queueRepository.save(entry);
                })
                .orElse(null);
    }

    public long getQueueCount() {
        return queueRepository.countByStatus(QueueEntry.Status.WAITING);
    }

}
