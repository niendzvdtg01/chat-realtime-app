package com.example.chatapp.mongodb.respository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.chatapp.MongodbModel.MessageDocument;
import java.util.List;

public interface ChatMessageRespository extends MongoRepository<MessageDocument, String> {
    List<MessageDocument> findByConversationIdOrderByTimestampDesc(Integer conversationId);

    // find message via conversatioId
    List<MessageDocument> findByConversationId(Integer conversationId);
}
