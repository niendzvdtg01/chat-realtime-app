package com.example.chatapp.jpa.respository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.chatapp.entity.Conversations;

public interface ConversationRespository extends JpaRepository<Conversations, Integer> {
    @Query("""
            SELECT c FROM Conversations c
            JOIN ConversationMembers m1 ON m1.conversationId = c
            JOIN ConversationMembers m2 ON m2.conversationId = c
            WHERE m1.userId.id = :user1
            AND m2.userId.id = :user2
            AND c.type = com.example.chatapp.EnumType.ConversationType.PRIVATE
            """)
    Optional<Conversations> findPrivateConversation(@Param("user1") Integer user1, @Param("user2") Integer user2);
}
