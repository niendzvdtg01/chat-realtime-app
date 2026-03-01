package com.example.chatapp.jpa.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chatapp.entity.ConversationMembers;

public interface ConversationMembersRepository extends JpaRepository<ConversationMembers, Integer> {

}
