package com.example.chatapp.jpa.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chatapp.entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
    //
}
