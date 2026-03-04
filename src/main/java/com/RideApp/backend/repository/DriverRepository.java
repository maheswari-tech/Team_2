
package com.RideApp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.RideApp.backend.entity.Driver;

public interface DriverRepository extends JpaRepository<Driver, Long> {

    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByLicenseNumber(String licenseNumber);
}