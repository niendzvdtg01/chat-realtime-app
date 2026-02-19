package com.example.chatapp.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.chatapp.dto.UserCreation;
import com.example.chatapp.entity.Users;
import com.example.chatapp.jpa.respository.UsersRespository;

@Service
public class UserServices {
    private final UsersRespository usersRespository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserServices(UsersRespository usersRespository) {
        this.usersRespository = usersRespository;
    }

    public Users createUsers(UserCreation requests) {
        Users user = new Users();
        user.setEmail(requests.getEmail());
        // hash password
        String passwordHash = encoder.encode(requests.getPassword());
        user.setPassword(passwordHash);
        user.setAvatarUrl(requests.getAvatarUrl());
        user.setBio(requests.getBio());
        user.setFirstName(requests.getFirstName());
        user.setLastName(requests.getLastName());
        return usersRespository.save(user);
    }
}
