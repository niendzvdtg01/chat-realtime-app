package com.example.chatapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.dto.GroupMemberCreation;
import com.example.chatapp.services.GroupChatServices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path = "/api/group")
public class GroupChatController {
    @Autowired
    private GroupChatServices groupChatServices;

    @PostMapping(path = "/create_group")
    public ResponseEntity<?> createGroupChat(@RequestBody List<GroupMemberCreation> request, String name,
            Authentication authentication) {
        Integer currentId = (Integer) authentication.getPrincipal();
        try {
            groupChatServices.createGroupChat(request, currentId, name);
            return ResponseEntity.ok("Succucessful!!");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Loi" + ex);
        }
    }

}
