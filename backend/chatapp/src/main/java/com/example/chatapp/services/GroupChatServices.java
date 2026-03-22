package com.example.chatapp.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.chatapp.EnumType.ConversationType;
import com.example.chatapp.EnumType.RoleType;
import com.example.chatapp.dto.GroupMemberCreation;
import com.example.chatapp.entity.ConversationMembers;
import com.example.chatapp.entity.Conversations;
import com.example.chatapp.entity.Users;
import com.example.chatapp.exception.UserNotFoundException;
import com.example.chatapp.jpa.respository.ConversationMembersRepository;
import com.example.chatapp.jpa.respository.ConversationRespository;
import com.example.chatapp.jpa.respository.UsersRespository;

import jakarta.transaction.Transactional;

@Service
public class GroupChatServices {
    private final UsersRespository usersRespository;
    private final ConversationRespository conversationRespository;
    private final ConversationMembersRepository conversationMembersRepository;

    public GroupChatServices(UsersRespository usersRespository,
            ConversationRespository conversationRespository,
            ConversationMembersRepository conversationMembersRepository) {
        this.usersRespository = usersRespository;
        this.conversationRespository = conversationRespository;
        this.conversationMembersRepository = conversationMembersRepository;
    }

    public Conversations createConversation(String name, Integer userId) {
        Users currentUser = usersRespository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Users not found !!"));
        Conversations conversations = new Conversations();
        // generate conversationId
        conversations.setCreatedBy(currentUser);
        conversations.setType(ConversationType.GROUP);
        conversations.setName(name);
        Conversations savedConversation = conversationRespository.save(conversations);
        return savedConversation;
    }

    public ConversationMembers addMembers(Integer userId, Conversations conversations, RoleType type) {
        Users members = usersRespository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found!!"));
        ConversationMembers conversationMembers = new ConversationMembers();
        conversationMembers.setConversationsId(conversations);
        conversationMembers.setRole(type);
        conversationMembers.setUserId(members);
        return conversationMembersRepository.save(conversationMembers);
    }

    @Transactional
    public void createGroupChat(List<GroupMemberCreation> request, Integer formerId, String name) {
        // generate conversationId
        Conversations conversationsId = createConversation(name, formerId);
        // add admin
        addMembers(formerId, conversationsId, RoleType.ADMIN);
        //
        for (GroupMemberCreation members : request) {
            addMembers(members.getUserId(), conversationsId, RoleType.MEMBER);
        }
    }
}