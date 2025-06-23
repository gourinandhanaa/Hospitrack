package com.hospitrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "blood_unit")
public class BloodUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private boolean critical;

    @Column(name = "units_available")
    private int unitsAvailable;

    // Default constructor
    public BloodUnit() {}

    // Constructor with all fields
    public BloodUnit(String type, boolean critical, int unitsAvailable) {
        this.type = type;
        this.critical = critical;
        this.unitsAvailable = unitsAvailable;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isCritical() {
        return critical;
    }

    public void setCritical(boolean critical) {
        this.critical = critical;
    }

    public int getUnitsAvailable() {
        return unitsAvailable;
    }

    public void setUnitsAvailable(int unitsAvailable) {
        this.unitsAvailable = unitsAvailable;
    }

    // Custom getter for blood type
    public String getBloodType() {
        return this.type;
    }
}

