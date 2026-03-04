package com.example.backend.Service;

import java.util.Map;

import com.example.backend.Entity.User;

public interface UserService {
    public User userregister(User user);
    public Map<String,Object> userlogin(String email,String pass);
}
