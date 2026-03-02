package com.example.chatapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;

import com.example.chatapp.MongodbModel.MessageDocument;
import com.example.chatapp.dto.PrivateConversationRequest;
import com.example.chatapp.entity.Conversations;
import com.example.chatapp.services.ChatMessageServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {
    @Autowired
    private ChatMessageServices chatMessageServices;

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public ResponseEntity<?> sendMessage(MessageDocument message) {
        try {
            chatMessageServices.saveMessage(message);
            return ResponseEntity.ok("Successfully!");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Fail");
        }
    }

    @PostMapping(path = "/create_conversation")
    public Conversations createPrivateConversation(@RequestBody PrivateConversationRequest request,
            Authentication authentication) {
        try {
            Integer currentId = (Integer) authentication.getPrincipal();
            return chatMessageServices.createPrivateConversations(currentId, request.getReceiverId());
        } catch (Exception e) {
            throw new RuntimeException("Loi!!!");
        }
    }

}
