package com.example.chatapp.services;

import org.springframework.stereotype.Service;

import com.example.chatapp.entity.Contact;
import com.example.chatapp.entity.Users;
import com.example.chatapp.exception.UserNotFoundException;
import com.example.chatapp.jpa.respository.ContactRepository;
import com.example.chatapp.jpa.respository.UsersRespository;

@Service
public class ContactServices {
    private final ContactRepository contactRepository;
    private final UsersRespository usersRespository;

    public ContactServices(ContactRepository contactRepository,
            UsersRespository usersRespository) {
        this.contactRepository = contactRepository;
        this.usersRespository = usersRespository;
    }

    public void insertContact(Integer userId, Integer friendId) {
        Users user = usersRespository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Users not found!!"));
        Users friend = usersRespository.findById(friendId)
                .orElseThrow(() -> new UserNotFoundException("Users not found!!"));
        Contact contact = new Contact();
        contact.setUserId(user);
        contact.setFriendId(friend);
        contactRepository.save(contact);
    }
}
