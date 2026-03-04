package com.RideApp.backend.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RideApp.backend.entity.Driver;
import com.RideApp.backend.repository.DriverRepository;
import com.RideApp.backend.service.DriverService;

@Service
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Override
    public Driver createDriver(Driver driver) {

        if (driverRepository.existsByEmail(driver.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (driverRepository.existsByUsername(driver.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (driverRepository.existsByLicenseNumber(driver.getLicenseNumber())) {
            throw new RuntimeException("License number already exists");
        }

        return driverRepository.save(driver);
    }
}