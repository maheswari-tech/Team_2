package com.example.backend.Controller;

import com.example.backend.Entity.Ride;
import com.example.backend.Service.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/rides")
public class RideController {

    @Autowired
    private RideService rideService;

    @PostMapping("/book")
    public Ride bookRide(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        String pickup = payload.get("pickup").toString();
        String drop = payload.get("drop").toString();
        String vehicle = payload.get("vehicle").toString();
        Double distance = Double.valueOf(payload.get("distance").toString());
        
        return rideService.createRide(userId, pickup, drop, vehicle, distance);
    }

    @GetMapping("/available")
    public List<Ride> getAvailableRides() {
        return rideService.getAvailableRides();
    }

    @PostMapping("/accept")
    public Ride acceptRide(@RequestBody Map<String, Long> payload) {
        return rideService.acceptRide(payload.get("rideId"), payload.get("driverId"));
    }

    @PostMapping("/start")
    public Ride startRide(@RequestBody Map<String, Object> payload) {
        Long rideId = Long.valueOf(payload.get("rideId").toString());
        String otp = payload.get("otp").toString();
        return rideService.startRide(rideId, otp);
    }

    @PostMapping("/complete")
    public Ride completeRide(@RequestBody Map<String, Long> payload) {
        return rideService.completeRide(payload.get("rideId"));
    }

    @GetMapping("/user/{userId}")
    public List<Ride> getUserRides(@PathVariable Long userId) {
        return rideService.getUserRides(userId);
    }

    @GetMapping("/driver/{driverId}/active")
    public Ride getActiveRide(@PathVariable Long driverId) {
        return rideService.getDriverActiveRide(driverId);
    }

    @PostMapping("/cancel")
    public Ride cancelRide(@RequestBody Map<String, Long> payload) {
        return rideService.cancelRide(payload.get("rideId"));
    }
}
