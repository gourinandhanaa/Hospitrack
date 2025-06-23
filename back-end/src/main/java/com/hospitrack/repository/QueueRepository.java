package com.hospitrack.repository;

import com.hospitrack.model.QueueEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueueRepository extends JpaRepository<QueueEntry, Long> {

    // 🔁 Count how many patients are currently "WAITING"
    long countByStatus(QueueEntry.Status status);
}
