package com.example.chatapp.dto;

public class PrivateConversationRequest {
    private Integer receiverId;

    public Integer getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Integer receiverId) {
        this.receiverId = receiverId;
    }

    public PrivateConversationRequest() {
    }
}
