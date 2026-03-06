package com.example.backend.Service.ServiceImpl;

import java.util.HashMap;
import java.util.Map;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepo;
import com.example.backend.Service.UserService;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepo userRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public User userregister(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

     @Override
    public Map<String,Object> userlogin(String email,String pass){
        Map<String,Object> response = new HashMap<>();
        Optional<User> optionalUser = userRepo.findByEmail(email);

        if(optionalUser.isEmpty()){
            response.put("success",false);
            response.put("message","Email Not Found");
            return response;
        }

        User user = optionalUser.get();
        if(!encoder.matches(pass, user.getPassword())){
            response.put("success",false);
            response.put("message","Incorrect Password");
            return response;
        }

        response.put("success",true);
        response.put("message","Login SuccessFul");
        response.put("userId", user.getId());
        return response;
    }
}
