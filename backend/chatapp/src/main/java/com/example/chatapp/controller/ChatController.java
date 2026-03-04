package com.example.chatapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;

import com.example.chatapp.MongodbModel.MessageDocument;
import com.example.chatapp.dto.PrivateConversationRequest;
import com.example.chatapp.entity.Conversations;
import com.example.chatapp.jpa.respository.ConversationRespository;
import com.example.chatapp.services.ChatMessageServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class ChatController {
    @Autowired
    private ChatMessageServices chatMessageServices;
    @Autowired
    private ConversationRespository conversationRespository;

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public MessageDocument sendMessage(MessageDocument message) {
        try {
            return chatMessageServices.saveMessage(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @PostMapping(path = "/create_conversation")
    public Conversations createPrivateConversation(@RequestBody PrivateConversationRequest request,
            Authentication authentication) {
        Integer currentId = (Integer) authentication.getPrincipal();
        return chatMessageServices.createPrivateConversations(currentId, request.getReceiverId());
    }

    @GetMapping(path = "/get_conversation")
    public List<Conversations> getAllconversation() {
        return conversationRespository.findAll();
    }
}
