package com.hospitrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "patients")
public class Patients {

    public enum PatientStatus {
        WAITING,
        IN_CONSULTATION,
        COMPLETED,
        CANCELLED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer age;
    private String gender;
    private String contact;
    private String priority;
    private String doctor;

    @Enumerated(EnumType.STRING)
    private PatientStatus status;

    private Integer tokenNumber;

    private String condition; // ✅ Added condition field

    public Patients() {}

    public Patients(String name, Integer age, String gender, String contact, String priority,
                    String doctor, PatientStatus status, Integer tokenNumber, String condition) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.contact = contact;
        this.priority = priority;
        this.doctor = doctor;
        this.status = status;
        this.tokenNumber = tokenNumber;
        this.condition = condition;
    }

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

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public PatientStatus getStatus() {
        return status;
    }

    public void setStatus(PatientStatus status) {
        this.status = status;
    }

    public Integer getTokenNumber() {
        return tokenNumber;
    }

    public void setTokenNumber(Integer tokenNumber) {
        this.tokenNumber = tokenNumber;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }
}

