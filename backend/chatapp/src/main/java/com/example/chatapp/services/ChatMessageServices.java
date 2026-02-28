package com.example.chatapp.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.chatapp.MongodbModel.MessageDocument;
import com.example.chatapp.entity.Conversations;
import com.example.chatapp.jpa.respository.ConversationRespository;
import com.example.chatapp.mongodb.respository.ChatMessageRespository;

import jakarta.transaction.Transactional;

@Service
public class ChatMessageServices {

    private final ChatMessageRespository chatMessageRespository;
    private final ConversationRespository conversationRespository;

    public ChatMessageServices(
            ChatMessageRespository chatMessageRespository,
            ConversationRespository conversationRespository) {

        this.chatMessageRespository = chatMessageRespository;
        this.conversationRespository = conversationRespository;
    }

    @Transactional
    public void saveMessage(MessageDocument message) {

        message.setTimestamp(LocalDateTime.now());

        chatMessageRespository.save(message);
        Conversations conversation = conversationRespository
                .findById(message.getConversationId())
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        conversation.setCreateAt(LocalDateTime.now());
        conversationRespository.save(conversation);
    }
}
