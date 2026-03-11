package com.example.chatapp.dto;

import com.example.chatapp.EnumType.StatusType;
import com.example.chatapp.entity.Users;

public class FriendRequestCreation {
    private Integer id;
    private Integer senderId;
    private Integer receiverId;
    private StatusType status;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSenderId() {
        return this.senderId;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }

    public Integer getReceiverId() {
        return this.receiverId;
    }

    public void setReceiverId(Integer receiverId) {
        this.receiverId = receiverId;
    }

    public StatusType getStatus() {
        return this.status;
    }

    public void setStatus(StatusType status) {
        this.status = status;
    }

}
