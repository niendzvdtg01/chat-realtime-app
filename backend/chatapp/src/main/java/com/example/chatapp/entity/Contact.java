package com.example.chatapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Contact")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contact_id")
    private Integer contactId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users userId;
    @ManyToOne
    @JoinColumn(name = "friend_id")
    private Users friendId;

    public Contact(Integer contactId, Users userId, Users friendId) {
        this.contactId = contactId;
        this.userId = userId;
        this.friendId = friendId;
    }

    public Contact() {

    }

    public Integer getContactId() {
        return this.contactId;
    }

    public void setContactId(Integer contactId) {
        this.contactId = contactId;
    }

    public Users getUserId() {
        return this.userId;
    }

    public void setUserId(Users userId) {
        this.userId = userId;
    }

    public Users getFriendId() {
        return this.friendId;
    }

    public void setFriendId(Users friendId) {
        this.friendId = friendId;
    }
}
