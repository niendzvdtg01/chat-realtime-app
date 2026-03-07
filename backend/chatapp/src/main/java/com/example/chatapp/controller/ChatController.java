package com.example.chatapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;

import com.example.chatapp.MongodbModel.MessageDocument;
import com.example.chatapp.dto.MessageResponse;
import com.example.chatapp.dto.PrivateConversationRequest;
import com.example.chatapp.entity.Conversations;
import com.example.chatapp.jpa.respository.ConversationRespository;
import com.example.chatapp.services.ChatMessageServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class ChatController {
    @Autowired
    private ChatMessageServices chatMessageServices;
    @Autowired
    private ConversationRespository conversationRespository;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/sendMessage")
    public MessageDocument sendMessage(MessageDocument message) {
        try {
            MessageDocument messageDocument = chatMessageServices.saveMessage(message);
            simpMessagingTemplate.convertAndSend("/topic/conversation/" + messageDocument.getConversationId(),
                    messageDocument);
            return messageDocument;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @PostMapping(path = "/get_messages")
    public MessageResponse createPrivateConversation(@RequestBody PrivateConversationRequest request,
            Authentication authentication) {
        Integer currentId = (Integer) authentication.getPrincipal();
        return chatMessageServices.getMessage(currentId, request.getReceiverId());
    }

    @GetMapping(path = "/get_conversation")
    public List<Conversations> getAllconversation() {
        return conversationRespository.findAll();
    }

    @GetMapping(path = "/test_cookie")
    public Integer cookieId(Authentication authentication) {
        return (Integer) authentication.getPrincipal();
    }

}
