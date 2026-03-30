package com.example.chatapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.chatapp.dto.UserCreation;
import com.example.chatapp.entity.Users;
import com.example.chatapp.jpa.respository.UsersRespository;
import com.example.chatapp.services.CloudinaryServices;
import com.example.chatapp.services.UserServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping(path = "/user")
public class UsersController {
    private final UserServices userServices;
    private final CloudinaryServices cloudinaryServices;
    @Autowired
    private UsersRespository usersRespository;

    public UsersController(UserServices userServices, CloudinaryServices cloudinaryServices) {
        this.userServices = userServices;
        this.cloudinaryServices = cloudinaryServices;
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

    @GetMapping(path = "/find_user")
    public List<Users> findUsername(@RequestParam(required = false) String keyword, Authentication authentication) {
        Integer currentId = (Integer) authentication.getPrincipal();
        if (keyword == null || keyword.trim().isEmpty()) {
            return List.of(); // khong search
        }
        return usersRespository.findByUserName(keyword, currentId);
    }

    @GetMapping(path = "/get_userinfo")
    public Optional<Users> getMethodName(Authentication authentication) {
        Integer userId = (Integer) authentication.getPrincipal();
        return usersRespository.findById(userId);
    }

    @GetMapping(path = "/find_all_friends")
    public List<Users> getAllFriends(Authentication authentication) {
        Integer userId = (Integer) authentication.getPrincipal();
        return usersRespository.findAllFriends(userId);
    }

    @PostMapping(path = "/update_user")
    public ResponseEntity<?> updateUser(@RequestParam(value = "file", required = false) MultipartFile file,
            @ModelAttribute UserCreation request,
            Authentication authentication) {
        try {
            Integer userId = (Integer) authentication.getPrincipal();
            if (file != null && !file.isEmpty()) {
                String avatarUrl = cloudinaryServices.uploadFile(file);
                request.setAvatarUrl(avatarUrl);
            }
            userServices.updateUser(userId, request);
            return ResponseEntity.ok("Update thong tin tai khoan thanh cong!!!");
        } catch (Exception ex) {
            throw new RuntimeException("Loi: " + ex);
        }
    }
}
