package com.example.chatapp.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.example.chatapp.EnumType.ConversationType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "Conversations")
public class Conversations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "conversation_id")
    private Integer conversationId;
    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private ConversationType type;
    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private Users createdBy;
    @Column(name = "created_at")
    private LocalDateTime createAt;
    @OneToMany(mappedBy = "conversationId", cascade = CascadeType.ALL)
    private List<ConversationMembers> members;
    @Column(name = "name")
    private String name;

    @PrePersist
    protected void onCreate() {
        this.createAt = LocalDateTime.now();
    }

    public Conversations() {

    }

    public Conversations(Integer conversationId, ConversationType type, Users createdBy, LocalDateTime createAt,
            List<ConversationMembers> members, String name) {
        this.conversationId = conversationId;
        this.type = type;
        this.createdBy = createdBy;
        this.createAt = createAt;
        this.members = members;
        this.name = name;
    }

    public Integer getConversationId() {
        return this.conversationId;
    }

    public void setConversationId(Integer conversationId) {
        this.conversationId = conversationId;
    }

    public ConversationType getType() {
        return this.type;
    }

    public void setType(ConversationType type) {
        this.type = type;
    }

    public Users getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Users createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreateAt() {
        return this.createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public List<ConversationMembers> getMembers() {
        return this.members;
    }

    public void setMembers(List<ConversationMembers> members) {
        this.members = members;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

}