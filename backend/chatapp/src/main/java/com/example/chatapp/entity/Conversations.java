package com.example.chatapp.entity;

import java.util.Date;

import com.example.chatapp.EnumType.ConversationType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @Column(name = "created_by", nullable = false)
    private Users createdBy;
    @ManyToOne
    @JoinColumn(name = "created_at")
    private Date create_at;

    public Conversations() {

    }

    public Conversations(Integer conversationId, ConversationType type, Users createdBy, Date create_at) {
        this.conversationId = conversationId;
        this.type = type;
        this.createdBy = createdBy;
        this.create_at = create_at;
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

    public Date getCreate_at() {
        return this.create_at;
    }

    public void setCreate_at(Date create_at) {
        this.create_at = create_at;
    }
}