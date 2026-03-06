package com.example.backend.Service.ServiceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.Entity.Driver;
import com.example.backend.Repository.DriverRepo;
import com.example.backend.Service.DriverService;

@Service
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepo driverRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public Driver addDriver(Driver driver) {
        driver.setJoinedDate(java.time.LocalDate.now().toString());
        driver.setPassword(encoder.encode(driver.getPassword()));
        return driverRepo.save(driver);
    }

    @Override
    public List<Driver> getAllDrivers() {
        return driverRepo.findAll();
    }

    @Override
    public void deleteDriver(Long id) {
        driverRepo.deleteById(id);
    }

    @Override
    public Driver getDriverById(Long id) {
        return driverRepo.findById(id).orElse(null);
    }

    @Override
    public Map<String,Object> driverlogin(String email,String pass){
        Map<String,Object> response = new HashMap<>();
        Optional<Driver> optionalDriver = driverRepo.findByEmail(email);

        if(optionalDriver.isEmpty()){
            response.put("success",false);
            response.put("message","Email Not Found");
            return response;
        }

        Driver driver = optionalDriver.get();
        if(!encoder.matches(pass, driver.getPassword())){
            response.put("success",false);
            response.put("message","Incorrect Password");
            return response;
        }

        response.put("success",true);
        response.put("message","Login SuccessFul");
        response.put("driverId", driver.getId());
        return response;
    }
}
