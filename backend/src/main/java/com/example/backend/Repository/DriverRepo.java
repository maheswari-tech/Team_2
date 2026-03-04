package com.example.backend.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.Entity.Driver;

public interface DriverRepo extends JpaRepository<Driver, Long> {
    Optional<Driver> findByEmail(String email);
}