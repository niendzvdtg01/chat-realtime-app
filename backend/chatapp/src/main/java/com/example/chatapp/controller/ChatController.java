package com.example.chatapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
    public MessageDocument sendMessage(MessageDocument message) {
        System.out.println("Controller received message: " + message.getContent());
        return chatMessageServices.saveMessage(message);
    }
}
