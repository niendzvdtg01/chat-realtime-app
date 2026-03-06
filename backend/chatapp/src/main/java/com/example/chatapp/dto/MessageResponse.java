package com.example.chatapp.dto;

import java.util.List;

import com.example.chatapp.MongodbModel.MessageDocument;

public class MessageResponse {
    private Integer conversationId;
    private List<MessageDocument> messageDocuments;

    public MessageResponse(Integer conversationId, List<MessageDocument> messageDocuments) {
        this.conversationId = conversationId;
        this.messageDocuments = messageDocuments;
    }

    public Integer getConversationId() {
        return this.conversationId;
    }

    public void setConversationId(Integer conversationId) {
        this.conversationId = conversationId;
    }

    public List<MessageDocument> getMessageDocuments() {
        return this.messageDocuments;
    }

    public void setMessageDocuments(List<MessageDocument> messageDocuments) {
        this.messageDocuments = messageDocuments;
    }
}
