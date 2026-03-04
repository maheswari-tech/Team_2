package com.example.backend.Service;

import java.util.List;
import java.util.Map;

import com.example.backend.Entity.Driver;

public interface DriverService {
    Driver addDriver(Driver driver);
    List<Driver> getAllDrivers();
    void deleteDriver(Long id);
    Driver getDriverById(Long id);
    public Map<String,Object> driverlogin(String email,String pass);
}