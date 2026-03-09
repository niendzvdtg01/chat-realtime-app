package com.example.chatapp.dto;

import com.example.chatapp.EnumType.StatusType;

public class ContactRequest {
    private Integer contactId;
    private Integer userId;
    private Integer friendId;
    private StatusType status;

    public ContactRequest(Integer contactId, Integer userId, Integer friendId, StatusType status) {
        this.contactId = contactId;
        this.userId = userId;
        this.friendId = friendId;
        this.status = status;
    }

    public Integer getContactId() {
        return this.contactId;
    }

    public void setContactId(Integer contactId) {
        this.contactId = contactId;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getFriendId() {
        return this.friendId;
    }

    public void setFriendId(Integer friendId) {
        this.friendId = friendId;
    }

    public StatusType getStatus() {
        return this.status;
    }

    public void setStatus(StatusType status) {
        this.status = status;
    }
}
