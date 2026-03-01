package com.example.chatapp.dto;

import com.example.chatapp.EnumType.ConversationType;
import com.example.chatapp.entity.Users;

public class ConversationRequest {
    private Integer conversationId;
    private ConversationType type;
    private Users createdBy;

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

}
