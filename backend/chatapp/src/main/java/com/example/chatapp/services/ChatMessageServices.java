package com.example.chatapp.services;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;

import com.example.chatapp.EnumType.ConversationType;
import com.example.chatapp.MongodbModel.MessageDocument;
import com.example.chatapp.dto.MessageResponse;
import com.example.chatapp.entity.ConversationMembers;
import com.example.chatapp.entity.Conversations;
import com.example.chatapp.entity.Users;
import com.example.chatapp.exception.UserNotFoundException;
import com.example.chatapp.jpa.respository.ConversationMembersRepository;
import com.example.chatapp.jpa.respository.ConversationRespository;
import com.example.chatapp.jpa.respository.UsersRespository;
import com.example.chatapp.mongodb.respository.ChatMessageRespository;

import jakarta.transaction.Transactional;

@Service
public class ChatMessageServices {

    private final ChatMessageRespository chatMessageRespository;
    private final ConversationRespository conversationRespository;
    private final UsersRespository usersRespository;
    private final ConversationMembersRepository conversationMembersRepository;

    public ChatMessageServices(
            ChatMessageRespository chatMessageRespository,
            ConversationRespository conversationRespository,
            UsersRespository usersRespository,
            ConversationMembersRepository conversationMembersRepository) {
        this.chatMessageRespository = chatMessageRespository;
        this.conversationRespository = conversationRespository;
        this.usersRespository = usersRespository;
        this.conversationMembersRepository = conversationMembersRepository;
    }

    @Transactional
    public MessageDocument saveMessage(MessageDocument message) {
        message.setTimestamp(LocalDateTime.now());
        System.out.println("Before---");
        conversationRespository
                .findById(message.getConversationId())
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        MessageDocument saved = chatMessageRespository.save(message);
        System.out.println(message.getContent());
        System.out.println(saved.getId());
        return saved;
    }

    @Transactional
    public Conversations createPrivateConversations(Integer currentId, Integer receiveId) {
        if (currentId == null || receiveId == null) {
            throw new IllegalArgumentException("UserId cannot be null");
        }
        Integer user1 = Math.min(currentId, receiveId);
        Integer user2 = Math.max(currentId, receiveId);

        List<Conversations> existing = conversationRespository.findPrivateConversation(user1, user2);
        if (!existing.isEmpty()) {
            System.out.println(existing.get(0).getConversationId());
            return existing.get(0);
        }
        Conversations conversations = new Conversations();
        Users creator = usersRespository.findById(currentId)
                .orElseThrow(() -> new UserNotFoundException("User not found!!!"));
        Users receiver = usersRespository.findById(receiveId)
                .orElseThrow(() -> new UserNotFoundException("User not found!!!"));
        conversations.setCreatedBy(creator);
        conversations.setType(ConversationType.PRIVATE);

        Conversations saveConversations = conversationRespository.save(conversations);

        ConversationMembers conversationMembers1 = new ConversationMembers();

        // user 1
        conversationMembers1.setConversationsId(saveConversations);
        conversationMembers1.setUserId(creator);

        // user2
        ConversationMembers conversationMembers2 = new ConversationMembers();
        conversationMembers2.setConversationsId(saveConversations);
        conversationMembers2.setUserId(receiver);

        conversationMembersRepository.save(conversationMembers1);
        conversationMembersRepository.save(conversationMembers2);
        return saveConversations;
    }

    @Transactional
    public MessageResponse getMessage(Integer currentId, Integer receiverId) {
        Conversations conversations = createPrivateConversations(currentId, receiverId);
        List<MessageDocument> messageDocument = chatMessageRespository
                .findByConversationId(conversations.getConversationId());
        return new MessageResponse(conversations.getConversationId(), messageDocument);
    }
}