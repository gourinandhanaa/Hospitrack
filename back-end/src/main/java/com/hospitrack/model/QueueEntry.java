package com.hospitrack.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "queue_entries")
public class QueueEntry {

    public enum Status {
        WAITING,
        IN_CONSULTATION,
        COMPLETED,
        CANCELLED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int tokenNumber;

    @Enumerated(EnumType.STRING)
    private Status status;

    // Constructors
    public QueueEntry() {
    }

    public QueueEntry(String name, int tokenNumber, Status status) {
        this.name = name;
        this.tokenNumber = tokenNumber;
        this.status = status;
    }

    public QueueEntry(String name, int tokenNumber, String status) {
        this.name = name;
        this.tokenNumber = tokenNumber;
        this.status = Status.valueOf(status.toUpperCase().replace(" ", "_"));
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getTokenNumber() {
        return tokenNumber;
    }

    public void setTokenNumber(int tokenNumber) {
        this.tokenNumber = tokenNumber;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}