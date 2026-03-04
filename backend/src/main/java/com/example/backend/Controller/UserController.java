package com.example.backend.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/userdetail")
    public User userregister(@RequestBody User user){
        return userService.userregister(user);
    }

    @PostMapping("/user-login")
    public Map<String,Object> userlogin(@RequestBody Map<String,String> loginDetails){
        String email = loginDetails.get("email");
        String pass = loginDetails.get("password");
        return userService.userlogin(email,pass);
    }
}
