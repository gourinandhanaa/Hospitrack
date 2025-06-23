package com.hospitrack.repository;

import com.hospitrack.model.Bed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BedRepository extends JpaRepository<Bed, Long> {
    // Custom query method to find beds by availability
    List<Bed> findByAvailable(boolean available);

    // Custom query method to find beds by room type
    List<Bed> findByRoomType(String roomType);
}
