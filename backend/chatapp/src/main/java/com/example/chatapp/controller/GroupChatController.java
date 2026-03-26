package com.example.chatapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.dto.CreateGroupRequest;
import com.example.chatapp.entity.Conversations;
import com.example.chatapp.jpa.respository.ConversationRespository;
import com.example.chatapp.services.GroupChatServices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping(path = "/api/group")
public class GroupChatController {
    @Autowired
    private GroupChatServices groupChatServices;
    @Autowired
    private ConversationRespository conversationRespository;

    @PostMapping(path = "/create_group")
    public ResponseEntity<?> createGroupChat(@RequestBody CreateGroupRequest request,
            Authentication authentication) {
        Integer currentId = (Integer) authentication.getPrincipal();
        try {
            groupChatServices.createGroupChat(request.getMembers(), currentId, request.getName());
            return ResponseEntity.ok("Succucessful!!");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Loi" + ex);
        }
    }

    @GetMapping(path = "/get_group")
    public List<Conversations> getAllGroup(Authentication authentication) {
        Integer userId = (Integer) authentication.getPrincipal();
        return conversationRespository.findGroupChat(userId);
    }

}
