package com.example.chatapp.services;

import org.springframework.stereotype.Service;

import com.example.chatapp.EnumType.ConversationType;
import com.example.chatapp.dto.ContactRequest;
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

    public Contact createContact(ContactRequest contactRequest) {
        Contact contact = new Contact();
        Users currentUser = usersRespository.findById(contactRequest.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found!!"));
        contact.setUserId(currentUser);
        Users friendUser = usersRespository.findById(contactRequest.getFriendId())
                .orElseThrow(() -> new UserNotFoundException("User not found!!"));
        contact.setFriendId(friendUser);
        return contactRepository.save(contact);
    }
}
