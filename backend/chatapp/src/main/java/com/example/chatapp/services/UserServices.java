package com.example.chatapp.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.chatapp.dto.UserCreation;
import com.example.chatapp.entity.Users;
import com.example.chatapp.exception.UserNotFoundException;
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

    @Transactional
    public void updateUser(Integer userId, UserCreation request) {
        Users user = usersRespository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found!!!"));
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getAvatarUrl() != null) {
            user.setAvatarUrl(request.getAvatarUrl());
        }
        if (request.getBio() != null) {
            user.setBio(request.getBio());
        }
        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            String passwordHash = encoder.encode(request.getPassword());
            user.setPassword(passwordHash);
        }
        usersRespository.save(user);
    }
}