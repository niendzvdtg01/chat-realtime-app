package com.example.chatapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.dto.FriendRequestCreation;
import com.example.chatapp.entity.FriendRequest;
import com.example.chatapp.services.FriendRequestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path = "/api")
public class FriendRequestController {
    @Autowired
    private FriendRequestService friendRequestService;

    @PostMapping(path = "/friend_request")
    public FriendRequest postMethodName(@RequestBody FriendRequestCreation request, Authentication authentication) {
        try {
            Integer sender = (Integer) authentication.getPrincipal();
            return friendRequestService.createFriendRequest(request, sender);
        } catch (Exception ex) {
            throw new RuntimeException("Loi: " + ex);
        }
    }

}
