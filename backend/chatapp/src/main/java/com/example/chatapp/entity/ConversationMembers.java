package com.example.chatapp.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "ConversationMembers")
public class ConversationMembers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "conversation_id", nullable = false, unique = true)
    private Conversations conversationId;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private Users userId;
    @Column(name = "join_at")
    private LocalDateTime joinAt;

    @PrePersist
    protected void onJoin() {
        this.joinAt = LocalDateTime.now();
    }

    public ConversationMembers() {

    }

    public ConversationMembers(Integer id, Conversations conversationId, Users userId, LocalDateTime joinAt) {
        this.id = id;
        this.conversationId = conversationId;
        this.userId = userId;
        this.joinAt = joinAt;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Conversations getConversationId() {
        return this.conversationId;
    }

    public void setConversationsId(Conversations conversationId) {
        this.conversationId = conversationId;
    }

    public Users getUserId() {
        return this.userId;
    }

    public void setUserId(Users userId) {
        this.userId = userId;
    }

    public LocalDateTime getJoinAt() {
        return this.joinAt;
    }

    public void setJoinAt(LocalDateTime joinAt) {
        this.joinAt = joinAt;
    }
}