package com.example.chatapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.dto.UserCreation;
import com.example.chatapp.entity.Users;
import com.example.chatapp.reponsitory.UsersRespository;
import com.example.chatapp.services.UserServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping(path = "/user")
public class UsersController {
    private final UserServices userServices;
    @Autowired
    private UsersRespository usersRespository;

    public UsersController(UserServices userServices) {
        this.userServices = userServices;
    }

    @PostMapping(path = "/create_user")
    public ResponseEntity<?> createUser(@RequestBody UserCreation requests) {
        try {
            userServices.createUsers(requests);
            return ResponseEntity.ok().body("Tao tai khoan thanh cong!!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Tao tai khoan that bai!!!");
        }
    }

    @GetMapping(path = "/getAllUser")
    public List<Users> getAllUsers() {
        return usersRespository.findAll();
    }
}