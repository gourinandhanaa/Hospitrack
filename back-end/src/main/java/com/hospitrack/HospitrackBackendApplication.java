package com.hospitrack;

import com.hospitrack.model.QueueEntry;
import com.hospitrack.model.QueueEntry.Status;
import com.hospitrack.repository.QueueRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HospitrackBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(HospitrackBackendApplication.class, args);
    }

    // CommandLineRunner to load data at startup if the queue is empty
    @Bean
    public CommandLineRunner dataLoader(QueueRepository queueRepository) {
        return args -> {
            // Check if the queue already has data, if not, load initial data
            if (queueRepository.count() == 0) {
                // Using enum values (recommended approach)
                queueRepository.save(new QueueEntry("John Doe", 1, Status.WAITING));
                queueRepository.save(new QueueEntry("Alice Smith", 2, Status.IN_CONSULTATION));
                queueRepository.save(new QueueEntry("Mark Taylor", 3, Status.COMPLETED));
                queueRepository.save(new QueueEntry("Sarah Wilson", 4, Status.WAITING));
                queueRepository.save(new QueueEntry("David Brown", 5, Status.IN_CONSULTATION));

                System.out.println("Initial data loaded into the queue!");
            }
        };
    }
}
