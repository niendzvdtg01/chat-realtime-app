package com.example.chatapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.example.chatapp.MongodbModel.MessageDocument;
import com.example.chatapp.services.ChatMessageServices;

@Controller
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
}
