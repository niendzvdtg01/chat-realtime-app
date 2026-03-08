package com.example.chatapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.chatapp.entity.Users;
import com.example.chatapp.exception.UserNotFoundException;
import com.example.chatapp.jpa.respository.UsersRespository;

@Service
public class AuthServices {
    @Autowired
    private UsersRespository usersRespository;

    public Users authencate(String email, String rawPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        Users user = usersRespository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found!!!"));
        if (!encoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Incorrect password!!!");
        }
        return user;
    }
}
