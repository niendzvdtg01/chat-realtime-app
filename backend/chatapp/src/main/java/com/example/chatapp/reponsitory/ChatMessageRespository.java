package com.example.chatapp.reponsitory;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.chatapp.MongodbModel.MessageDocument;

public interface ChatMessageRespository extends MongoRepository<MessageDocument, String> {

}
