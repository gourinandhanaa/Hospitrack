package com.hospitrack.model;

import java.util.List;

public class DashboardStats {

    private long totalResources;
    private int activePatients;
    private int queueCount;
    private int roomAndBedTotal;
    private int roomAndBedAvailable;
    private int ambulanceTotal;
    private int bloodBankTotal;
    private int patientTotal;
    private int doctorTotal;
    private int criticalAlerts;
    private List<String> criticalBloodTypes;
    private List<String> criticalAlertMessages;

    // Default Constructor
    public DashboardStats() {}

    // All-Args Constructor
    public DashboardStats(
            long totalResources,
            int activePatients,
            int queueCount,
            int roomAndBedTotal,
            int roomAndBedAvailable,
            int ambulanceTotal,
            int bloodBankTotal,
            int patientTotal,
            int doctorTotal,
            int criticalAlerts,
            List<String> criticalBloodTypes,
            List<String> criticalAlertMessages
    ) {
        this.totalResources = totalResources;
        this.activePatients = activePatients;
        this.queueCount = queueCount;
        this.roomAndBedTotal = roomAndBedTotal;
        this.roomAndBedAvailable = roomAndBedAvailable;
        this.ambulanceTotal = ambulanceTotal;
        this.bloodBankTotal = bloodBankTotal;
        this.patientTotal = patientTotal;
        this.doctorTotal = doctorTotal;
        this.criticalAlerts = criticalAlerts;
        this.criticalBloodTypes = criticalBloodTypes;
        this.criticalAlertMessages = criticalAlertMessages;
    }

    // Getters and Setters
    public long getTotalResources() {
        return totalResources;
    }

    public void setTotalResources(long totalResources) {
        this.totalResources = totalResources;
    }

    public int getActivePatients() {
        return activePatients;
    }

    public void setActivePatients(int activePatients) {
        this.activePatients = activePatients;
    }

    public int getQueueCount() {
        return queueCount;
    }

    public void setQueueCount(int queueCount) {
        this.queueCount = queueCount;
    }

    public int getRoomAndBedTotal() {
        return roomAndBedTotal;
    }

    public void setRoomAndBedTotal(int roomAndBedTotal) {
        this.roomAndBedTotal = roomAndBedTotal;
    }

    public int getRoomAndBedAvailable() {
        return roomAndBedAvailable;
    }

    public void setRoomAndBedAvailable(int roomAndBedAvailable) {
        this.roomAndBedAvailable = roomAndBedAvailable;
    }

    public int getAmbulanceTotal() {
        return ambulanceTotal;
    }

    public void setAmbulanceTotal(int ambulanceTotal) {
        this.ambulanceTotal = ambulanceTotal;
    }

    public int getBloodBankTotal() {
        return bloodBankTotal;
    }

    public void setBloodBankTotal(int bloodBankTotal) {
        this.bloodBankTotal = bloodBankTotal;
    }

    public int getPatientTotal() {
        return patientTotal;
    }

    public void setPatientTotal(int patientTotal) {
        this.patientTotal = patientTotal;
    }

    public int getDoctorTotal() {
        return doctorTotal;
    }

    public void setDoctorTotal(int doctorTotal) {
        this.doctorTotal = doctorTotal;
    }

    public int getCriticalAlerts() {
        return criticalAlerts;
    }

    public void setCriticalAlerts(int criticalAlerts) {
        this.criticalAlerts = criticalAlerts;
    }

    public List<String> getCriticalBloodTypes() {
        return criticalBloodTypes;
    }

    public void setCriticalBloodTypes(List<String> criticalBloodTypes) {
        this.criticalBloodTypes = criticalBloodTypes;
    }

    public List<String> getCriticalAlertMessages() {
        return criticalAlertMessages;
    }

    public void setCriticalAlertMessages(List<String> criticalAlertMessages) {
        this.criticalAlertMessages = criticalAlertMessages;
    }
}

