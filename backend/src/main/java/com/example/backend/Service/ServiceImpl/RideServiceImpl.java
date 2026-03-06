package com.example.backend.Service.ServiceImpl;

import com.example.backend.Entity.Driver;
import com.example.backend.Entity.Ride;
import com.example.backend.Entity.User;
import com.example.backend.Repository.DriverRepo;
import com.example.backend.Repository.RideRepository;
import com.example.backend.Repository.UserRepo;
import com.example.backend.Service.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class RideServiceImpl implements RideService {

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private DriverRepo driverRepository;

    @Override
    public Ride createRide(Long userId, String pickup, String drop, String vehicle, Double distance) {
        User user = userRepository.findById(userId).orElseThrow();
        Ride ride = new Ride();
        ride.setUser(user);
        ride.setPickupLocation(pickup);
        ride.setDropLocation(drop);
        ride.setVehicleType(vehicle);
        ride.setDistance(distance);
        ride.setStatus("REQUESTED");
        ride.setBookingTime(LocalDateTime.now());
        
        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));
        ride.setOtp(otp);
        
        // Calculate fare
        double rate = vehicle.equalsIgnoreCase("Bike") ? 10.0 : (vehicle.equalsIgnoreCase("Auto") ? 15.0 : 20.0);
        ride.setFare(distance * rate);

        return rideRepository.save(ride);
    }

    @Override
    public List<Ride> getAvailableRides() {
        return rideRepository.findByStatus("REQUESTED");
    }

    @Override
    public Ride acceptRide(Long rideId, Long driverId) {
        Ride ride = rideRepository.findById(rideId).orElseThrow();
        Driver driver = driverRepository.findById(driverId).orElseThrow();
        
        ride.setDriver(driver);
        ride.setStatus("ACCEPTED");
        return rideRepository.save(ride);
    }

    @Override
    public Ride startRide(Long rideId, String otp) {
        Ride ride = rideRepository.findById(rideId).orElseThrow();
        if (ride.getOtp().equals(otp)) {
            ride.setStatus("ONGOING");
            ride.setStartTime(LocalDateTime.now());
            return rideRepository.save(ride);
        }
        throw new RuntimeException("Invalid OTP");
    }

    @Override
    public Ride completeRide(Long rideId) {
        Ride ride = rideRepository.findById(rideId).orElseThrow();
        ride.setStatus("COMPLETED");
        ride.setEndTime(LocalDateTime.now());
        return rideRepository.save(ride);
    }

    @Override
    public List<Ride> getUserRides(Long userId) {
        return rideRepository.findByUserId(userId);
    }

    @Override
    public Ride getDriverActiveRide(Long driverId) {
        List<Ride> activeRides = rideRepository.findByDriverId(driverId);
        return activeRides.stream()
                .filter(r -> r.getStatus().equals("ACCEPTED") || r.getStatus().equals("ONGOING"))
                .findFirst()
                .orElse(null);
    }

    @Override
    public Ride cancelRide(Long rideId) {
        Ride ride = rideRepository.findById(rideId).orElseThrow();
        ride.setStatus("CANCELLED");
        return rideRepository.save(ride);
    }
}
