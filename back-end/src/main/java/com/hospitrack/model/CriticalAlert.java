package com.hospitrack.model;

import jakarta.persistence.*;

@Entity
public class CriticalAlert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    // Default constructor
    public CriticalAlert() {}

    // Constructor with fields
    public CriticalAlert(String description) {
        this.description = description;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Custom method to return the alert message
    public String getMessage() {
        return this.description;
    }
}
