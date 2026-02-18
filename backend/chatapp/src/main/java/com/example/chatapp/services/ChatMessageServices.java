package com.example.chatapp.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.chatapp.MongodbModel.MessageDocument;
import com.example.chatapp.reponsitory.ChatMessageRespository;

@Service
public class ChatMessageServices {
    @Autowired
    private ChatMessageRespository chatMessageRespository;

    public MessageDocument saveMessage(MessageDocument messages) {
        messages.setTimestamp(LocalDateTime.now());
        return chatMessageRespository.save(messages);
    }
}
