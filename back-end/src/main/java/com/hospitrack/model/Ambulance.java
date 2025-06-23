package com.hospitrack.model;

import jakarta.persistence.*;

@Entity
public class Ambulance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean available;

    // Default constructor
    public Ambulance() {}

    // Constructor with fields
    public Ambulance(boolean available) {
        this.available = available;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}
