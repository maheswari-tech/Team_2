package com.example.backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "drivers")
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String vehicle;
    private String password;
    private String location;

    private String status = "offline";
    private int rides = 0;

    private String joinedDate;

    public Driver() {}

    public Driver(String name, String email, String phone, String vehicle, String password, String location, String joinedDate) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.vehicle = vehicle;
        this.password = password;
        this.location = location;
        this.joinedDate = joinedDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getVehicle() { return vehicle; }
    public void setVehicle(String vehicle) { this.vehicle = vehicle; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getRides() { return rides; }
    public void setRides(int rides) { this.rides = rides; }

    public String getJoinedDate() { return joinedDate; }
    public void setJoinedDate(String joinedDate) { this.joinedDate = joinedDate; }
}
