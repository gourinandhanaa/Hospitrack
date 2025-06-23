package com.hospitrack.service;

import com.hospitrack.model.DashboardStats;
import com.hospitrack.model.QueueEntry;
import com.hospitrack.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class DashboardService {

    private static final Logger logger = LoggerFactory.getLogger(DashboardService.class);

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private BedRepository bedRepository;

    @Autowired
    private AmbulanceRepository ambulanceRepository;

    @Autowired
    private BloodBankRepository bloodBankRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private CriticalAlertRepository criticalAlertRepository;

    public DashboardStats getStats() {
        long queueCount = queueRepository.countByStatus(QueueEntry.Status.WAITING);
        long doctorTotal = doctorRepository.count();
        long patientTotal = patientRepository.count();
        long roomAndBedTotal = bedRepository.count();
        long roomAndBedAvailable = bedRepository.findByAvailable(true).size();
        long ambulanceTotal = ambulanceRepository.count();
        long bloodBankTotal = bloodBankRepository.count();
        long criticalAlerts = criticalAlertRepository.count();
        long activePatients = patientTotal; // Or use logic if you track status

        // Debugging doctorTotal count
        logger.debug("Doctor Total Count: " + doctorTotal);

        long totalResources = doctorTotal + patientTotal + roomAndBedTotal + ambulanceTotal +
                              bloodBankTotal + queueCount + criticalAlerts;

        return new DashboardStats(
                totalResources,
                (int) activePatients,
                (int) queueCount,
                (int) roomAndBedTotal,
                (int) roomAndBedAvailable,
                (int) ambulanceTotal,
                (int) bloodBankTotal,
                (int) patientTotal,
                (int) doctorTotal,
                (int) criticalAlerts,
                Collections.emptyList(),
                Collections.emptyList()
        );
    }
}
