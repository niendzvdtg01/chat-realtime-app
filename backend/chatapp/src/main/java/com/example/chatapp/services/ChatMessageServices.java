package com.example.chatapp.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.chatapp.MongodbModel.MessageDocument;
import com.example.chatapp.entity.Conversations;
import com.example.chatapp.jpa.respository.ConversationRespository;
import com.example.chatapp.mongodb.respository.ChatMessageRespository;

@Service
public class ChatMessageServices {
    @Autowired
    private ChatMessageRespository chatMessageRespository;
    private ConversationRespository conversationRespository;

    public void saveMessage(MessageDocument messages) {
        messages.setTimestamp(LocalDateTime.now());
        chatMessageRespository.save(messages);
        // Save conversationId into Mysql database
        Conversations conversations = conversationRespository.findById(messages.getConversationId()).orElseThrow();
        conversations.setCreateAt(LocalDateTime.now());
        conversationRespository.save(conversations);
    }
}
