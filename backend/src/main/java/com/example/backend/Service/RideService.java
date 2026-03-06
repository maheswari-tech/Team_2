package com.example.backend.Service;

import com.example.backend.Entity.Ride;
import java.util.List;
import java.util.Map;

public interface RideService {
    Ride createRide(Long userId, String pickup, String drop, String vehicle, Double distance);
    List<Ride> getAvailableRides();
    Ride acceptRide(Long rideId, Long driverId);
    Ride startRide(Long rideId, String otp);
    Ride completeRide(Long rideId);
    List<Ride> getUserRides(Long userId);
    Ride getDriverActiveRide(Long driverId);
    Ride cancelRide(Long rideId);
}
