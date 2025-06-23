package com.hospitrack.model;

import jakarta.persistence.*;

@Entity
public class Bed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean available;

    private String roomType;  // Adding roomType field

    // Default constructor
    public Bed() {}

    // Constructor with fields
    public Bed(boolean available, String roomType) {
        this.available = available;
        this.roomType = roomType;
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

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }
}
