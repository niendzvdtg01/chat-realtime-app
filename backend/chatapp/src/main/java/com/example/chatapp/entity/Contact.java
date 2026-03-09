package com.example.chatapp.entity;

import com.example.chatapp.EnumType.StatusType;

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
    private Users frinedId;
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private StatusType status;

    public Contact(Integer contactId, Users userId, Users frinedId, StatusType status) {
        this.contactId = contactId;
        this.userId = userId;
        this.frinedId = frinedId;
        this.status = status;
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

    public Users getFrinedId() {
        return this.frinedId;
    }

    public void setFrinedId(Users frinedId) {
        this.frinedId = frinedId;
    }

    public StatusType getStatus() {
        return this.status;
    }

    public void setStatus(StatusType status) {
        this.status = status;
    }
}
