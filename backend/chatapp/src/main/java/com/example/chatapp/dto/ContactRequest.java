package com.example.chatapp.dto;

public class ContactRequest {
    private Integer contactId;
    private Integer userId;
    private Integer friendId;

    public ContactRequest(Integer contactId, Integer userId, Integer friendId) {
        this.contactId = contactId;
        this.userId = userId;
        this.friendId = friendId;
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
}
