package com.example.chatapp.services;

import java.time.LocalDateTime;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.example.chatapp.MongodbModel.MessageDocument;
import com.example.chatapp.dto.ConversationRequest;
import com.example.chatapp.entity.Conversations;
import com.example.chatapp.entity.Users;
import com.example.chatapp.jpa.respository.ConversationRespository;
import com.example.chatapp.jpa.respository.UsersRespository;
import com.example.chatapp.mongodb.respository.ChatMessageRespository;

import jakarta.transaction.Transactional;

@Service
public class ChatMessageServices {

    private final ChatMessageRespository chatMessageRespository;
    private final ConversationRespository conversationRespository;
    private final UsersRespository usersRespository;

    public ChatMessageServices(
            ChatMessageRespository chatMessageRespository,
            ConversationRespository conversationRespository,
            UsersRespository usersRespository) {

        this.chatMessageRespository = chatMessageRespository;
        this.conversationRespository = conversationRespository;
        this.usersRespository = usersRespository;
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

    public Conversations createConversations(ConversationRequest request, Integer userId) {
        Conversations conversations = new Conversations();
        conversations.setType(request.getType());
        Users user = usersRespository.findById(userId).orElseThrow(() -> new RuntimeException("User not found!!!"));
        conversations.setCreatedBy(user);
        return conversationRespository.save(conversations);
    }
}
