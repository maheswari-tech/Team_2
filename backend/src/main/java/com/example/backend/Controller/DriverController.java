package com.example.backend.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.Entity.Driver;
import com.example.backend.Service.DriverService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @PostMapping("/driver-register")
    public Driver addDriver(@RequestBody Driver driver) {
        return driverService.addDriver(driver);
    }


    @GetMapping
    public List<Driver> getAllDrivers() {
        return driverService.getAllDrivers();
    }

    // Get driver by ID
    @GetMapping("/{id}")
    public Driver getDriverById(@PathVariable Long id) {
        return driverService.getDriverById(id);
    }

    // Delete driver
    @DeleteMapping("/{id}")
    public String deleteDriver(@PathVariable Long id) {
        driverService.deleteDriver(id);
        return "Driver with ID " + id + " deleted successfully";
    }

    @PostMapping("/driver-login")
    public Map<String,Object> driverlogin(@RequestBody Map<String,String> loginDetails){
        String email = loginDetails.get("email");
        String pass = loginDetails.get("password");
        return driverService.driverlogin(email,pass);
    }
}
